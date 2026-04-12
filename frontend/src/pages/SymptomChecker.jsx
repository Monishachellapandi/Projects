import React, { useState } from 'react';

function SymptomChecker() {
    const [symptoms, setSymptoms] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const checkSymptoms = async () => {
        setLoading(true);
        setError('');
        try {
            // Attempt to hit the Python backend
            const response = await fetch('http://localhost:5001/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ symptoms })
            });

            if (!response.ok) throw new Error('API Error');
            const data = await response.json();
            setResult(data);
        } catch (err) {
            // Fallback to offline logic if Service Worker intercept doesn't catch it
            // Or network drops before SW can handle it smoothly
            try {
                const offRes = await fetch('/offline_symptoms.json');
                const offlineData = await offRes.json();
                
                // Simple keyword matching for offline fallback
                const lowerSymptoms = symptoms.toLowerCase();
                let foundMatch = null;
                for (const conditionData of Object.values(offlineData)) {
                    if (conditionData.keywords.some(kw => lowerSymptoms.includes(kw))) {
                        foundMatch = conditionData;
                        break;
                    }
                }

                if (foundMatch) {
                    setResult({
                        condition: foundMatch.condition,
                        confidence: "Offline Estimate",
                        recommendation: foundMatch.recommendation,
                        disclaimer: "DISCLAIMER: Running in offline mode. Not a medical diagnosis."
                    });
                } else {
                    setResult({
                        condition: "Unknown",
                        confidence: "N/A",
                        recommendation: "Cannot analyze offline. Please connect to internet or see a doctor.",
                        disclaimer: "DISCLAIMER: Running in offline mode. Not a medical diagnosis."
                    });
                }
            } catch (offlineErr) {
                setError('Failed to reach AI service and offline cache is unavailable.');
            }
        }
        setLoading(false);
    };

    return (
        <div>
            <h1 className="page-title">AI Symptom Checker</h1>
            
            <div className="alert-warning">
                <strong>Disclaimer:</strong> This tool provides an AI-powered advisory based on your symptoms. It is <em>not</em> a medical diagnosis. In an emergency, please call your local emergency services immediately.
            </div>

            <div className="card">
                <div className="input-group">
                    <label>Describe your symptoms clearly:</label>
                    <textarea 
                        rows="4" 
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        placeholder="E.g., I have a severe headache and nausea since yesterday..."
                    />
                </div>
                <button className="btn btn-primary" onClick={checkSymptoms} disabled={loading || !symptoms.trim()}>
                    {loading ? 'Analyzing...' : 'Analyze Symptoms'}
                </button>
                {error && <p style={{color: 'red', marginTop: 10}}>{error}</p>}
            </div>

            {result && (
                <div className="card" style={{borderLeft: '4px solid var(--success-green)'}}>
                    <h3 style={{marginBottom: 10, color: 'var(--primary-blue)'}}>Analysis Context: {result.condition}</h3>
                    <p><strong>Confidence / Reliability:</strong> {result.confidence}%</p>
                    <p style={{marginTop: 10}}><strong>Recommendation:</strong> {result.recommendation}</p>
                    <p style={{marginTop: 16, fontSize: '0.85em', color: 'var(--text-muted)'}}>{result.disclaimer}</p>
                </div>
            )}
        </div>
    );
}

export default SymptomChecker;
