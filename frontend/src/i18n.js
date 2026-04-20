import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "nav": { "brand": "Telemedicine", "signin": "Sign In" },
      "hero": {
        "badge": "Accessible Care for Everyone",
        "title1": "Expert Medical Care,",
        "title2": "Directly to Your Village",
        "desc": "Breaking geographic barriers to provide real-time consultations and reliable health tracking for rural communities.",
        "getStarted": "Get Started Now",
        "learnMore": "Learn More",
        "doctors": "Verified Doctors",
        "secure": "Secure Data"
      },
      "features": {
        "sectionTitle": "Complete Rural Healthcare Ecosystem",
        "sectionDesc": "We've built all the tools you need for a healthy life, designed specifically for connectivity in rural regions.",
        "ai": { "title": "AI Symptom Checker", "desc": "Instant AI-powered medical advisory based on your symptoms." },
        "pharmacy": { "title": "Live Pharmacy Search", "desc": "Locate life-saving medicines in nearby pharmacies with real-time stock." },
        "records": { "title": "Verified Health Vault", "desc": "Securely store and verify your health records with doctor oversight." },
        "video": { "title": "Low-Bandwidth Calls", "desc": "Consult verified doctors via video calls optimized for slow internet." }
      },
      "process": {
        "title": "A Seamless Journey to Better Health",
        "step1": { "t": "Register Profile", "d": "Securely sign up with your health history." },
        "step2": { "t": "Select Specialist", "d": "Choose from top verified doctors." },
        "step3": { "t": "Consult Virtually", "d": "Start your encrypted video/audio call." }
      },
      "footer": {
        "tagline": "Empowering global rural health with state-of-the-art tele-consultation technology.",
        "platform": "Platform",
        "login": "Login",
        "about": "About Us",
        "network": "Doctor Network",
        "support": "Support",
        "rights": "All rights reserved."
      },
      "register": {
        "title": "Create Account",
        "name": "Full Name",
        "email": "Email Address",
        "password": "Password",
        "role": "Account Role",
        "language": "Preferred Language",
        "btn": "Register",
        "haveAccount": "Already have an account?",
        "login": "Login",
        "success": "Registration successful! Redirecting to login..."
      },
      "login": {
        "title": "Sign In",
        "noAccount": "Don't have an account?",
        "register": "Register here",
        "btn": "Login",
        "email": "Email Address",
        "password": "Password"
      },
      "checker": {
        "title": "AI Symptom Checker",
        "disclaimer": "This tool provides an AI-powered advisory based on your symptoms. It is NOT a medical diagnosis. In an emergency, please call your local emergency services immediately.",
        "label": "Describe your symptoms clearly:",
        "placeholder": "E.g., I have a severe headache and nausea since yesterday...",
        "btn": "Analyze Symptoms",
        "analyzing": "Analyzing...",
        "context": "Analysis Context:",
        "confidence": "Confidence / Reliability:",
        "recommendation": "Recommendation:",
        "offlineDisclaimer": "DISCLAIMER: Running in offline mode. Not a medical diagnosis.",
        "offlineEstimate": "Offline Estimate",
        "unknown": "Unknown",
        "noInternet": "Cannot analyze offline. Please connect to internet or see a doctor.",
        "apiError": "Failed to reach AI service and offline cache is unavailable.",
        "labelDisclaimer": "Disclaimer"
      },
      "sidebar": {
        "dashboard": "Dashboard",
        "findMedicines": "Find Medicines",
        "manageInventory": "Manage Inventory",
        "symptomChecker": "Symptom Checker",
        "healthRecords": "Health Records",
        "prescriptions": "Prescriptions",
        "videoConsult": "Video Consult",
        "manageUsers": "Manage Users",
        "logout": "Logout",
        "language": "Language"
      },
      "dashboard": {
        "welcome": "Welcome back,"
      },
      "stats": {
        "prescriptions": "Active Prescriptions",
        "records": "Health Records",
        "pharmacies": "Available Pharmacies",
        "users": "Portal Users",
        "overview": "Dashboard Overview",
        "monitoring": "System monitoring is active.",
        "activityTrends": "Activity Trends (Last 7 Days)",
        "videoBtn": "Join Video Consult"
      },
      "health": {
        "title": "Health Records Dashboard",
        "uploadTitle": "Upload New Record",
        "patientId": "Patient ID",
        "details": "Record Details (Description)",
        "uploadBtn": "Upload File",
        "dbRecords": "Database Records",
        "loading": "Loading database...",
        "noRecords": "No records found in database.",
        "date": "Date",
        "forPatient": "For Patient ID",
        "verified": "Verified",
        "pending": "Pending Verification",
        "verifyBtn": "Verify Record"
      },
      "pharmacy": {
        "title": "Local Pharmacy Availability",
        "searchPlaceholder": "Search medicine (e.g., Amoxicillin)...",
        "loading": "Loading pharmacies near you...",
        "noMedicines": "No medicines found. Try another search term.",
        "inStock": "In Stock",
        "waiting": "Waiting for Delivery",
        "outOfStock": "Out of Stock",
        "standardDosage": "Standard Dosage",
        "adminTitle": "Pharmacy Inventory Manager",
        "addTitle": "Add Medicine to Stocklist",
        "medName": "Medicine Name",
        "dosage": "Dosage (Optional)",
        "initialStatus": "Initial Status",
        "addBtn": "Add Medicine",
        "loadingInv": "Loading inventory...",
        "inStockItems": "IN STOCK ITEMS",
        "outOfStockItems": "OUT OF STOCK",
        "detailedStock": "Detailed Stocklist",
        "noMedicinesReg": "No medicines registered.",
        "setInStock": "Set In Stock",
        "setOutOfStock": "Set Out of Stock",
        "remove": "Remove"
      },
      "prescriptions": {
        "titleDoctor": "Issue & View Prescriptions",
        "titlePatient": "My Prescriptions",
        "issueTitle": "Issue New Prescription",
        "medicines": "Medicines",
        "dosage": "Dosage",
        "submitBtn": "Submit Prescription",
        "loading": "Loading prescriptions...",
        "noPrescriptions": "No prescriptions found in the database.",
        "prescBy": "Prescription by",
        "dateAdded": "Date Added",
        "forPatient": "For Patient ID",
        "downloadPDF": "Download PDF"
      },
      "video": {
        "title": "Live Video Consultation",
        "status": "Status",
        "myCamera": "My Camera",
        "consultFeed": "Consultation Feed",
        "awaiting": "Awaiting Video Stream...",
        "endCall": "End Call / Disconnect"
      },
      "admin": {
        "title": "Admin Command Center",
        "desc": "Global system oversight and user management.",
        "totalUsers": "Total Users",
        "totalPrescriptions": "Total Prescriptions",
        "healthRecords": "Health Records",
        "pharmacies": "Registered Pharmacies",
        "activityTrend": "Global Activity Trend",
        "userList": "Recent User List",
        "accessDenied": "Admin access denied"
      },
      "roles": {
        "patient": "Patient",
        "doctor": "Doctor",
        "pharmacy": "Pharmacy",
        "admin": "Admin",
        "guest": "Guest"
      }
    }
  },
  hi: {
    translation: {
      "nav": { "brand": "टेलीमेडिसिन", "signin": "साइन इन" },
      "features": {
        "sectionTitle": "संपूर्ण ग्रामीण स्वास्थ्य देखभाल पारिस्थितिकी तंत्र",
        "sectionDesc": "हमने स्वस्थ जीवन के लिए आवश्यक सभी उपकरण तैयार किए हैं, जो विशेष रूप से ग्रामीण क्षेत्रों के लिए डिज़ाइन किए गए हैं।",
        "ai": { "title": "AI लक्षण जांचकर्ता", "desc": "आपके लक्षणों के आधार पर तुरंत AI-संचालित चिकित्सा सलाह।" },
        "pharmacy": { "title": "लाइव फार्मेसी खोज", "desc": "वास्तविक समय के स्टॉक के साथ नजदीकी फार्मेसियों में दवाएं खोजें।" },
        "records": { "title": "सत्यापित स्वास्थ्य वॉल्ट", "desc": "डॉक्टर की निगरानी के साथ अपने स्वास्थ्य रिकॉर्ड को सुरक्षित रूप से संग्रहीत करें।" },
        "video": { "title": "कम बैंडविड्थ कॉल", "desc": "धीमे इंटरनेट के लिए अनुकूलित वीडियो कॉल के माध्यम से विश्वसनीय डॉक्टरों से परामर्श लें।" }
      },
      "hero": {
        "badge": "सभी के लिए सुलभ देखभाल",
        "title1": "विशेषज्ञ चिकित्सा देखभाल,",
        "title2": "सीधे आपके गाँव तक",
        "getStarted": "अभी शुरू करें",
        "learnMore": "और जानें",
        "doctors": "सत्यापित डॉक्टर",
        "secure": "सुरक्षित डेटा"
      },
      "register": {
        "title": "खाता बनाएं",
        "name": "पूरा नाम",
        "email": "ईमेल पता",
        "password": "पासवर्ड",
        "role": "खाता भूमिका",
        "language": "पसंदीदा भाषा",
        "btn": "रजिस्टर करें",
        "success": "पंजीकरण सफल! लॉगइन पर पुनर्निर्देशित किया जा रहा है..."
      },
      "login": { "title": "साइन इन", "btn": "लॉगइन" },
      "checker": {
        "title": "AI लक्षण जांचकर्ता",
        "disclaimer": "यह उपकरण आपके लक्षणों के आधार पर एक AI-आधारित सलाह प्रदान करता है। यह एक चिकित्सा निदान नहीं है। आपात स्थिति में, तुरंत अपनी स्थानीय आपातकालीन सेवाओं को कॉल करें।",
        "label": "अपने लक्षणों को स्पष्ट रूप से बताएं:",
        "placeholder": "जैसे, मुझे कल से तेज सिरदर्द और जी मिचला रहा है...",
        "btn": "लक्षणों का विश्लेषण करें",
        "analyzing": "विश्लेषण किया जा रहा है...",
        "context": "विश्लेषण संदर्भ:",
        "confidence": "आत्मविश्वास / विश्वसनीयता:",
        "recommendation": "सिफारिश:",
        "offlineDisclaimer": "अस्वीकरण: ऑफ़लाइन मोड में चल रहा है। चिकित्सा निदान नहीं है।",
        "offlineEstimate": "ऑफ़लाइन अनुमान",
        "unknown": "अज्ञात",
        "noInternet": "ऑफ़लाइन विश्लेषण नहीं किया जा सकता। कृपया इंटरनेट से जुड़ें या डॉक्टर से मिलें।",
        "apiError": "AI सेवा तक पहुँचने में विफल और ऑफ़लाइन कैश अनुपलब्ध है।",
        "labelDisclaimer": "अस्वीकरण"
      },
      "sidebar": {
        "dashboard": "डैशबोर्ड",
        "findMedicines": "दवाएं खोजें",
        "manageInventory": "इन्वेंट्री प्रबंधन",
        "symptomChecker": "लक्षण जाँचकर्ता",
        "healthRecords": "स्वास्थ्य रिकॉर्ड",
        "prescriptions": "नुस्खे",
        "videoConsult": "वीडियो परामर्श",
        "logout": "लॉगआउट",
        "language": "भाषा"
      },
      "dashboard": { "welcome": "स्वागत है," },
      "stats": {
        "prescriptions": "सक्रिय नुस्खे",
        "records": "स्वास्थ्य रिकॉर्ड",
        "pharmacies": "उपलब्ध फार्मेसियाँ",
        "users": "पोर्टल उपयोगकर्ता",
        "overview": "डैशबोर्ड अवलोकन",
        "monitoring": "सिस्टम निगरानी सक्रिय है।",
        "activityTrends": "गतिविधि रुझान",
        "videoBtn": "वीडियो परामर्श में शामिल हों"
      },
      "health": {
        "title": "स्वास्थ्य रिकॉर्ड डैशबोर्ड",
        "uploadTitle": "नया रिकॉर्ड अपलोड करें",
        "patientId": "मरीज की आईडी",
        "details": "रिकॉर्ड विवरण",
        "uploadBtn": "फ़ाइल अपलोड करें",
        "dbRecords": "डेटाबेस रिकॉर्ड",
        "loading": "डेटाबेस लोड हो रहा है...",
        "noRecords": "डेटाबेस में कोई रिकॉर्ड नहीं मिला।",
        "date": "तारीख",
        "forPatient": "मरीज आईडी के लिए",
        "verified": "सत्यापित",
        "pending": "सत्यापन लंबित",
        "verifyBtn": "सत्यापित करें"
      },
      "pharmacy": {
        "title": "स्थानीय फार्मेसी उपलब्धता",
        "searchPlaceholder": "दवा खोजें...",
        "loading": "लोड हो रहा है",
        "inStock": "स्टॉक में",
        "waiting": "डिलीवरी की प्रतीक्षा",
        "outOfStock": "स्टॉक में नहीं",
        "standardDosage": "मानक खुराक",
        "adminTitle": "फार्मेसी इन्वेंट्री मैनेजर",
        "addTitle": "स्टॉकलिस्ट में दवा जोड़ें",
        "medName": "दवा का नाम",
        "dosage": "खुराक",
        "initialStatus": "प्रारंभिक स्थिति",
        "addBtn": "दवा जोड़ें",
        "loadingInv": "इन्वेंट्री लोड हो रही है...",
        "inStockItems": "स्टॉक में सामान",
        "outOfStockItems": "आउट ऑफ स्टॉक",
        "detailedStock": "विस्तृत स्टॉक सूची",
        "noMedicinesReg": "कोई दवा पंजीकृत नहीं है।",
        "setInStock": "स्टॉक में सेट करें",
        "setOutOfStock": "आउट ऑफ स्टॉक सेट करें",
        "remove": "हटाएं"
      },
      "prescriptions": {
        "titleDoctor": "नुस्खे जारी करें और देखें",
        "titlePatient": "मेरे नुस्खे",
        "issueTitle": "नया नुस्खा जारी करें",
        "medicines": "दवाएं",
        "dosage": "खुराक",
        "submitBtn": "नुस्खा सबमिट करें",
        "loading": "नुस्खे लोड हो रहे हैं...",
        "noPrescriptions": "डेटाबेस में कोई नुस्खा नहीं मिला।",
        "prescBy": "नुस्खा द्वारा",
        "dateAdded": "जोड़ने की तारीख",
        "forPatient": "मरीज आईडी के लिए",
        "downloadPDF": "पीडीएफ डाउनलोड करें"
      },
      "video": {
        "title": "लाइव वीडियो परामर्श",
        "status": "स्थिति",
        "myCamera": "मेरा कैमरा",
        "consultFeed": "परामर्श फ़ीड",
        "awaiting": "वीडियो स्ट्रीम की प्रतीक्षा है...",
        "endCall": "कॉल समाप्त करें"
      },
      "admin": {
        "title": "एडमिन कमांड सेंटर",
        "desc": "ग्लोबल सिस्टम ओवरसाइट और यूजर मैनेजमेंट।",
        "totalUsers": "कुल उपयोगकर्ता",
        "totalPrescriptions": "कुल नुस्खे",
        "healthRecords": "स्वास्थ्य रिकॉर्ड",
        "pharmacies": "पंजीकृत फार्मेसियाँ",
        "activityTrend": "ग्लोबल गतिविधि रुझान",
        "userList": "हालिया उपयोगकर्ता सूची",
        "accessDenied": "एडमिन एक्सेस अस्वीकार कर दिया गया"
      },
      "roles": {
        "patient": "मरीज",
        "doctor": "डॉक्टर",
        "pharmacy": "फार्मेसी",
        "admin": "एडमिन",
        "guest": "अतिथि"
      }
    }
  },
  pa: {
    translation: {
      "nav": { "brand": "ਟੈਲੀਮੇਡੀਸਨ", "signin": "ਸਾਈਨ ਇਨ" },
      "hero": {
        "badge": "ਸਭ ਲਈ ਪਹੁੰਚਯੋਗ ਦੇਖਭਾਲ",
        "title1": "ਮਾਹਿਰ ਡਾਕਟਰੀ ਦੇਖਭਾਲ,",
        "title2": "ਸਿੱਧਾ ਤੁਹਾਡੇ ਪਿੰਡ ਤੱਕ",
        "desc": "ਭੂਗੋਲਿਕ ਰੁਕਾਵਟਾਂ ਨੂੰ ਤੋੜ ਕੇ ਪੇਂਡੂ ਭਾਈਚਾਰਿਆਂ ਲਈ ਅਸਲ-ਸਮੇਂ ਦੀ ਸਲਾਹ ਅਤੇ ਭਰੋਸੇਯੋਗ ਸਿਹਤ ਟਰੈਕਿੰਗ ਪ੍ਰਦਾਨ ਕਰਨਾ।",
        "getStarted": "ਹੁਣੇ ਸ਼ੁਰੂ ਕਰੋ",
        "learnMore": "ਹੋਰ ਜਾਣੋ",
        "doctors": "ਪ੍ਰਮਾਣਿਤ ਡਾਕਟਰ",
        "secure": "ਸੁਰੱਖਿਅਤ ਡੇਟਾ"
      },
      "features": {
        "sectionTitle": "ਸੰਪੂਰਨ ਪੇਂਡੂ ਸਿਹਤ ਸੰਭਾਲ ਪ੍ਰਣਾਲੀ",
        "sectionDesc": "ਅਸੀਂ ਸਿਹਤਮੰਦ ਜੀਵਨ ਲਈ ਲੋੜੀਂਦੇ ਸਾਰੇ ਸਾਧਨ ਤਿਆਰ ਕੀਤੇ ਹਨ, ਜੋ ਖਾਸ ਤੌਰ 'ਤੇ ਪੇਂਡੂ ਖੇਤਰਾਂ ਲਈ ਹਨ।",
        "ai": { "title": "AI ਲੱਛਣ ਜਾਂਚਕਰਤਾ", "desc": "ਤੁਹਾਡੇ ਲੱਛਣਾਂ ਦੇ ਅਧਾਰ ਤੇ ਤੁਰੰਤ AI-ਸੰਚਾਲਿਤ ਡਾਕਟਰੀ ਸਲਾਹ।" },
        "pharmacy": { "title": "ਲਾਈਵ ਫਾਰਮੇਸੀ ਖੋਜ", "desc": "ਨੇੜਲੀਆਂ ਫਾਰਮੇਸੀਆਂ ਵਿੱਚ ਦਵਾਈਆਂ ਅਤੇ ਉਹਨਾਂ ਦੇ ਸਟਾਕ ਦੀ ਤੁਰੰਤ ਜਾਣਕਾਰੀ।" },
        "records": { "title": "ਪ੍ਰਮਾਣਿਤ ਸਿਹਤ ਵਾਲਟ", "desc": "ਡਾਕਟਰ ਦੀ ਨਿਗਰਾਨੀ ਹੇਠ ਆਪਣੇ ਸਿਹਤ ਰਿਕਾਰਡਾਂ ਨੂੰ ਸੁਰੱਖਿਅਤ ਰੱਖੋ।" },
        "video": { "title": "ਘੱਟ ਬੈਂਡਵਿਡਥ ਕਾਲਾਂ", "desc": "ਧੀਮੀ ਇੰਟਰਨੈਟ ਸਪੀਡ ਲਈ ਵੀਡੀਓ ਕਾਲਾਂ ਰਾਹੀਂ ਡਾਕਟਰਾਂ ਨਾਲ ਸਲਾਹ ਕਰੋ।" }
      },
      "register": {
        "title": "ਖਾਤਾ ਬਣਾਓ",
        "name": "ਪੂਰਾ ਨਾਮ",
        "email": "ਈਮੇਲ ਪਤਾ",
        "password": "ਪਾਸਵਰਡ",
        "role": "ਖਾਤੇ ਦੀ ਭੂਮਿਕਾ",
        "language": "ਤਰਜੀਹੀ ਭਾਸ਼ਾ",
        "btn": "ਰਜਿਸਟਰ ਕਰੋ",
        "success": "ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਸਫਲ! ਲੌਗਇਨ ਤੇ ਭੇਜਿਆ ਜਾ ਰਿਹਾ ਹੈ..."
      },
      "checker": {
        "title": "AI ਲੱਛਣ ਜਾਂਚਕਰਤਾ",
        "disclaimer": "ਇਹ ਸਾਧਨ ਤੁਹਾਡੇ ਲੱਛਣਾਂ ਦੇ ਅਧਾਰ ਤੇ ਇੱਕ AI-ਸੰਚਾਲਿਤ ਸਲਾਹ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ। ਇਹ ਡਾਕਟਰੀ ਨਿਦਾਨ ਨਹੀਂ ਹੈ। ਕਿਸੇ ਐਮਰਜੈਂਸੀ ਵਿੱਚ, ਕਿਰਪਾ ਕਰਕੇ ਤੁਰੰਤ ਆਪਣੀਆਂ ਸਥਾਨਕ ਐਮਰਜੈਂਸੀ ਸੇਵਾਵਾਂ ਨੂੰ ਕਾਲ ਕਰੋ।",
        "label": "ਆਪਣੇ ਲੱਛਣਾਂ ਦਾ ਸਪਸ਼ਟ ਵਰਣਨ ਕਰੋ:",
        "placeholder": "ਉਦਾਹਰਨ ਲਈ, ਮੈਨੂੰ ਕੱੱਲ੍ਹ ਤੋਂ ਤੇਜ਼ ਸਿਰ ਦਰਦ ਅਤੇ ਉਲਟੀ ਮਹਿਸੂਸ ਹੋ ਰਹੀ ਹੈ...",
        "btn": "ਲੱਛਣਾਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ",
        "analyzing": "ਵਿਸ਼ਲੇਸ਼ਣ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ...",
        "context": "ਵਿਸ਼ਲੇਸ਼ਣ ਸੰਦਰਭ:",
        "confidence": "ਭਰੋਸਾ / ਭਰੋਸੇਯੋਗਤਾ:",
        "recommendation": "ਸਿਫਾਰਸ਼:",
        "offlineDisclaimer": "ਬੇਦਾਅਵਾ: ਔਫਲਾਈਨ ਮੋਡ ਵਿੱਚ ਚੱਲ ਰਿਹਾ ਹੈ। ਡਾਕਟਰੀ ਨਿਦਾਨ ਨਹੀਂ ਹੈ।",
        "offlineEstimate": "ਔਫਲਾਈਨ ਅਨੁਮਾਨ",
        "unknown": "ਅਣਜਾਣ",
        "noInternet": "ਔਫਲਾਈਨ ਵਿਸ਼ਲੇਸ਼ਣ ਨਹੀਂ ਕੀਤਾ ਜਾ ਸਕਦਾ। ਕਿਰਪਾ ਕਰਕੇ ਇੰਟਰਨੈਟ ਨਾਲ ਜੁੜੋ ਜਾਂ ਡਾਕਟਰ ਨੂੰ ਮਿਲੋ।",
        "apiError": "AI ਸੇਵਾ ਤੱਕ ਪਹੁੰਚਣ ਵਿੱਚ ਅਸਫਲ ਅਤੇ ਔਫਲਾਈਨ ਕੈਸ਼ ਉਪਲਬਧ ਨਹੀਂ ਹੈ।",
        "labelDisclaimer": "ਬੇਦਾਅਵਾ"
      },
      "login": { "title": "ਸਾਈਨ ਇਨ", "btn": "ਲੌਗਇਨ" },
      "sidebar": {
        "dashboard": "ਡੈਸ਼ਬੋਰਡ",
        "findMedicines": "ਦਵਾਈਆਂ ਲੱਭੋ",
        "manageInventory": "ਇਨਵੈਂਟਰੀ ਪ੍ਰਬੰਧਨ",
        "symptomChecker": "ਲੱਛਣ ਜਾਂਚਕਰਤਾ",
        "healthRecords": "ਸਿਹਤ ਰਿਕਾਰਡ",
        "prescriptions": "ਨੁਸਖ਼ੇ",
        "videoConsult": "ਵੀਡੀਓ ਸਲਾਹ",
        "logout": "ਲੌਗਆਉਟ",
        "language": "ਭਾਸ਼ਾ"
      },
      "dashboard": { "welcome": "ਜੀ ਆਇਆਂ ਨੂੰ," },
      "stats": {
        "prescriptions": "ਸਰਗਰਮ ਨੁਸਖ਼ੇ",
        "records": "ਸਿਹਤ ਰਿਕਾਰਡ",
        "pharmacies": "ਉਪਲਬਧ ਫਾਰਮੇਸੀਆਂ",
        "users": "ਪੋਰਟਲ ਉਪਭੋਗਤਾ",
        "overview": "ਡੈਸ਼ਬੋਰਡ ਸੰਖੇਪ",
        "monitoring": "ਸਿਸਟਮ ਨਿਗਰਾਨੀ ਸਰਗਰਮ ਹੈ।",
        "activityTrends": "ਗਤੀਵਿਧੀ ਰੁਝਾਨ",
        "videoBtn": "ਵੀਡੀਓ ਸਲਾਹ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ"
      },
      "health": {
        "title": "ਸਿਹਤ ਰਿਕਾਰਡ ਡੈਸ਼ਬੋਰਡ",
        "uploadTitle": "ਨਵਾਂ ਰਿਕਾਰਡ ਅਪਲੋਡ ਕਰੋ",
        "patientId": "ਮਰੀਜ਼ ਦੀ ਆਈਡੀ",
        "details": "ਰਿਕਾਰਡ ਵੇਰਵੇ",
        "uploadBtn": "ਫਾਈਲ ਅਪਲੋਡ ਕਰੋ",
        "dbRecords": "ਡਾਟਾਬੇਸ ਰਿਕਾਰਡ",
        "loading": "ਡਾਟਾਬੇਸ ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...",
        "noRecords": "ਡਾਟਾਬੇਸ ਵਿੱਚ ਕੋਈ ਰਿਕਾਰਡ ਨਹੀਂ ਮਿਲਿਆ।",
        "date": "ਮਿਤੀ",
        "forPatient": "ਮਰੀਜ਼ ਆਈਡੀ ਲਈ",
        "verified": "ਪ੍ਰਮਾਣਿਤ",
        "pending": "ਪ੍ਰਮਾਣਿਕਤਾ ਬਾਕੀ ਹੈ",
        "verifyBtn": "ਪੁਸ਼ਟੀ ਕਰੋ"
      },
      "pharmacy": {
        "title": "ਸਥਾਨਕ ਫਾਰਮੇਸੀ ਉਪਲਬਧਤਾ",
        "searchPlaceholder": "ਦਵਾਈ ਖੋਜੋ...",
        "loading": "ਤੁਹਾਡੇ ਨੇੜੇ ਦੀਆਂ ਫਾਰਮੇਸੀਆਂ ਲੋਡ ਹੋ ਰਹੀਆਂ ਹਨ...",
        "noMedicines": "ਕੋਈ ਦਵਾਈ ਨਹੀਂ ਮਿਲੀ।",
        "inStock": "ਸਟਾਕ ਵਿੱਚ",
        "waiting": "ਡਿਲੀਵਰੀ ਦੀ ਉਡੀਕ",
        "outOfStock": "ਸਟਾਕ ਵਿੱਚ ਨਹੀਂ",
        "standardDosage": "ਮਿਆਰੀ ਖੁਰਾਕ",
        "adminTitle": "ਫਾਰਮੇਸੀ ਇਨਵੈਂਟਰੀ ਪ੍ਰਬੰਧਕ",
        "addTitle": "ਸਟਾਕ ਸੂਚੀ ਵਿੱਚ ਦਵਾਈ ਸ਼ਾਮਲ ਕਰੋ",
        "medName": "ਦਵਾਈ ਦਾ ਨਾਮ",
        "dosage": "ਖੁਰਾਕ",
        "initialStatus": "ਸ਼ੁਰੂਆਤੀ ਸਥਿਤੀ",
        "addBtn": "ਦਵਾਈ ਸ਼ਾਮਲ ਕਰੋ",
        "loadingInv": "ਇਨਵੈਂਟਰੀ ਲੋਡ ਹੋ ਰਹੀ ਹੈ...",
        "inStockItems": "ਸਟਾਕ ਵਿੱਚ ਆਈਟਮਾਂ",
        "outOfStockItems": "ਆਊਟ ਆਫ ਸਟਾਕ",
        "detailedStock": "ਵਿਸਤ੍ਰਿਤ ਸਟਾਕ ਸੂਚੀ",
        "noMedicinesReg": "ਕੋਈ ਦਵਾਈ ਰਜਿਸਟਰਡ ਨਹੀਂ ਹੈ।",
        "setInStock": "ਸਟਾਕ ਵਿੱਚ ਸੈੱਟ ਕਰੋ",
        "setOutOfStock": "ਆਊਟ ਆਫ ਸਟਾਕ ਸੈੱਟ ਕਰੋ",
        "remove": "ਹਟਾਓ"
      },
      "prescriptions": {
        "titleDoctor": "ਨੁਸਖ਼ੇ ਜਾਰੀ ਕਰੋ ਅਤੇ ਦੇਖੋ",
        "titlePatient": "ਮੇਰੇ ਨੁਸਖ਼ੇ",
        "issueTitle": "ਨਵਾਂ ਨੁਸਖ਼ਾ ਜਾਰੀ ਕਰੋ",
        "medicines": "ਦਵਾਈਆਂ",
        "dosage": "ਖੁਰਾਕ",
        "submitBtn": "ਨੁਸਖ਼ਾ ਜਮ੍ਹਾਂ ਕਰੋ",
        "loading": "ਨੁਸਖ਼ੇ ਲੋਡ ਹੋ ਰਹੇ ਹਨ...",
        "noPrescriptions": "ਡਾਟਾਬੇਸ ਵਿੱਚ ਕੋਈ ਨੁਸਖ਼ਾ ਨਹੀਂ ਮਿਲਿਆ।",
        "prescBy": "ਨੁਸਖ਼ਾ ਦੁਆਰਾ",
        "dateAdded": "ਸ਼ਾਮਲ ਕਰਨ ਦੀ ਮਿਤੀ",
        "forPatient": "ਮਰੀਜ਼ ਆਈਡੀ ਲਈ",
        "downloadPDF": "ਪੀਡੀਐਫ ਡਾਊਨਲੋਡ ਕਰੋ"
      },
      "video": {
        "title": "ਲਾਈਵ ਵੀਡੀਓ ਸਲਾਹ-ਮਸ਼ਵਰਾ",
        "status": "ਸਥਿਤੀ",
        "myCamera": "ਮੇਰਾ ਕੈਮਰਾ",
        "consultFeed": "ਸਲਾਹ ਫੀਡ",
        "awaiting": "ਵੀਡੀਓ ਸਟ੍ਰੀਮ ਦੀ ਉਡੀਕ ਹੈ...",
        "endCall": "ਕਾਲ ਖਤਮ ਕਰੋ"
      },
      "admin": {
        "title": "ਐਡਮਿਨ ਕਮਾਂਡ ਸੈਂਟਰ",
        "desc": "ਗਲੋਬਲ ਸਿਸਟਮ ਨਿਗਰਾਨੀ ਅਤੇ ਉਪਭੋਗਤਾ ਪ੍ਰਬੰਧਨ।",
        "totalUsers": "ਕੁੱਲ ਉਪਭੋਗਤਾ",
        "totalPrescriptions": "ਕੁੱਲ ਨੁਸਖ਼ੇ",
        "healthRecords": "ਸਿਹਤ ਰਿਕਾਰਡ",
        "pharmacies": "ਰਜਿਸਟਰਡ ਫਾਰਮੇਸੀਆਂ",
        "activityTrend": "ਗਲੋਬਲ ਗਤੀਵਿਧੀ ਰੁਝਾਨ",
        "userList": "ਹਾਲੀਆ ਉਪਭੋਗਤਾ ਸੂਚੀ",
        "accessDenied": "ਐਡਮਿਨ ਪਹੁੰਚ ਤੋਂ ਇਨਕਾਰ"
      },
      "roles": {
        "patient": "ਮਰੀਜ਼",
        "doctor": "ਡਾਕਟਰ",
        "pharmacy": "ਫਾਰਮੇਸੀ",
        "admin": "ਐਡਮਿਨ",
        "guest": "ਮਹਿਮਾਨ"
      }
    }
  },
  ta: {
    translation: {
      "nav": { "brand": "டெலிமெடிசின்", "signin": "உள்நுழைக" },
      "hero": {
        "badge": "அனைவருக்கும் எளிதான சிகிச்சை",
        "title1": "நிபுணத்துவ மருத்துவ சிகிச்சை,",
        "title2": "நேரடியாக உங்கள் கிராமத்திற்கு",
        "desc": "புவியியல் தடைகளை உடைத்து கிராமப்புற சமூகங்களுக்கு நிகழ்நேர ஆலோசனைகளை வழங்குதல்.",
        "getStarted": "இப்போதே தொடங்குங்கள்",
        "learnMore": "மேலும் அறிய",
        "doctors": "சரிபார்க்கப்பட்ட மருத்துவர்கள்",
        "secure": "பாதுகாப்பான தரவு"
      },
      "features": {
        "sectionTitle": "முழுமையான கிராமப்புற சுகாதார அமைப்பு",
        "sectionDesc": "ஆரோக்கியமான வாழ்விற்கு தேவையான அனைத்து கருவிகளையும் நாங்கள் உருவாக்கியுள்ளோம்.",
        "ai": { "title": "AI அறிகுறி சரிபார்ப்பு", "desc": "உங்கள் அறிகுறிகளின் அடிப்படையில் உடனடி AI மருத்துவ ஆலோசனை." },
        "pharmacy": { "title": "நேரடி மருந்தக தேடல்", "desc": "அருகிலுள்ள மருந்தகங்களில் மருந்துகளின் இருப்பை உடனுக்குடன் கண்டறியவும்." },
        "records": { "title": "சரிபார்க்கப்பட்ட சுகாதார பெட்டகம்", "desc": "உங்கள் சுகாதார பதிவுகளை பாதுகாப்பாக சேமித்து சரிபார்க்கவும்." },
        "video": { "title": "குறைந்த இணைய அழைப்புகள்", "desc": "குறைந்த இணைய வேகத்திலும் மருத்துவர்களுடன் வீடியோ மூலம் ஆலோசனை பெறலாம்." }
      },
      "register": {
        "title": "கணக்கை உருவாக்கவும்",
        "name": "முழு பெயர்",
        "email": "மின்னஞ்சல் முகவரி",
        "password": "கடவுச்சொல்",
        "role": "கணக்கு பங்கு",
        "language": "விருப்பமான மொழி",
        "btn": "பதிவு செய்",
        "success": "பதிவு வெற்றிகரமாக முடிந்தது! உள்நுழைவு பக்கத்திற்கு அனுப்பப்படுகிறது..."
      },
      "login": { "title": "உள்நுழைவு", "btn": "உள்நுழை" },
      "checker": {
        "title": "AI அறிகுறி சரிபார்ப்பு",
        "disclaimer": "இந்தக் கருவி உங்கள் அறிகுறிகளின் அடிப்படையில் AI-மூலம் இயங்கும் ஆலோசனையை வழங்குகிறது. இது மருத்துவ நோயறிதல் அல்ல. அவசரக்காலத்தில், உடனடியாக உங்கள் உள்ளூர் அவசரச் சேவைகளை அழைக்கவும்.",
        "label": "உங்கள் அறிகுறிகளைத் தெளிவாக விவரிக்கவும்:",
        "placeholder": "உதாரணமாக, எனக்கு நேற்று முதல் கடுமையான தலைவலி மற்றும் குமட்டல் உள்ளது...",
        "btn": "அறிகுறிகளை ஆய்வு செய்",
        "analyzing": "ஆய்வு செய்யப்படுகிறது...",
        "context": "ஆய்வு சூழல்:",
        "confidence": "நம்பிக்கை / நம்பகத்தன்மை:",
        "recommendation": "பரிந்துரை:",
        "offlineDisclaimer": "பொறுப்புத் துறப்பு: ஆஃப்லைன் பயன்முறையில் இயங்குகிறது. மருத்துவ நோயறிதல் அல்ல.",
        "offlineEstimate": "ஆஃப்லைன் மதிப்பீடு",
        "unknown": "அறியப்படாதது",
        "noInternet": "ஆஃப்லைனில் ஆய்வு செய்ய முடியாது. தயவுசெய்து இணையத்துடன் இணையவும் அல்லது மருத்துவரைப் பார்க்கவும்.",
        "apiError": "AI சேவையை அணுக முடியவில்லை மற்றும் ஆஃப்லைன் தற்காலிக சேமிப்பு இல்லை.",
        "labelDisclaimer": "பொறுப்புத் துறப்பு"
      },
      "sidebar": {
        "dashboard": "டாஷ்போர்டு",
        "findMedicines": "மருந்துகளைக் கண்டறியவும்",
        "manageInventory": "இருப்பு மேலாண்மை",
        "symptomChecker": "அறிகுறி சரிபார்ப்பு",
        "healthRecords": "சுகாதார பதிவுகள்",
        "prescriptions": "மருந்துச் சீட்டுகள்",
        "videoConsult": "வீடியோ ஆலோசனை",
        "logout": "வெளியேறு",
        "language": "மொழி"
      },
      "dashboard": { "welcome": "மீண்டும் வருக," },
      "stats": {
        "prescriptions": "செயலில் உள்ள மருந்துச் சீட்டுகள்",
        "records": "சுகாதார பதிவுகள்",
        "pharmacies": "கிடைக்கக்கூடிய மருந்தகங்கள்",
        "users": "போர்டல் பயனர்கள்",
        "overview": "டாஷ்போர்டு மேலோட்டம்",
        "monitoring": "கணினி கண்காணிப்பு செயலில் உள்ளது.",
        "activityTrends": "செயல்பாட்டு போக்குகள் (கடந்த 7 நாட்கள்)",
        "videoBtn": "வீடியோ ஆலோசனையில் சேரவும்"
      },
      "health": {
        "title": "சுகாதார பதிவுகள் டாஷ்போர்டு",
        "uploadTitle": "புதிய பதிவைப் பதிவேற்றவும்",
        "patientId": "நோயாளி ஐடி",
        "details": "பதிவு விவரங்கள்",
        "uploadBtn": "கோப்பைப் பதிவேற்றவும்",
        "dbRecords": "தரவுத்தள பதிவுகள்",
        "loading": "தரவுத்தளம் ஏற்றப்படுகிறது...",
        "noRecords": "தரவுத்தளத்தில் பதிவுகள் எதுவும் இல்லை.",
        "date": "தேதி",
        "forPatient": "நோயாளி ஐடிக்காக",
        "verified": "சரிபார்க்கப்பட்டது",
        "pending": "சரிபார்ப்பு நிலுவையில் உள்ளது",
        "verifyBtn": "சரிபார்க்கவும்"
      },
      "pharmacy": {
        "title": "உள்ளூர் மருந்தக இருப்பு",
        "searchPlaceholder": "மருந்தைத் தேடுங்கள்...",
        "loading": "உங்களுக்கு அருகிலுள்ள மருந்தகங்கள் ஏற்றப்படுகின்றன...",
        "noMedicines": "மருந்துகள் எதுவும் இல்லை.",
        "inStock": "இருப்பில் உள்ளது",
        "waiting": "டெலிவரிக்காகக் காத்திருக்கிறது",
        "outOfStock": "இருப்பில் இல்லை",
        "standardDosage": "நிலையான அளவு",
        "adminTitle": "மருந்தக இருப்பு மேலாளர்",
        "addTitle": "இருப்புப் பட்டியலில் மருந்தைச் சேர்க்கவும்",
        "medName": "மருந்தின் பெயர்",
        "dosage": "அளவு",
        "initialStatus": "ஆரம்ப நிலை",
        "addBtn": "மருந்தைச் சேர்",
        "loadingInv": "இருப்பு ஏற்றப்படுகிறது...",
        "inStockItems": "இருப்பில் உள்ள பொருட்கள்",
        "outOfStockItems": "இருப்பில் இல்லை",
        "detailedStock": "விரிவான இருப்புப் பட்டியல்",
        "noMedicinesReg": "மருந்துகள் எதுவும் பதிவு செய்யப்படவில்லை.",
        "setInStock": "இருப்பில் உள்ளதாக அமை",
        "setOutOfStock": "இருப்பில் இல்லை என அமை",
        "remove": "நீக்கு"
      },
      "prescriptions": {
        "titleDoctor": "மருந்துச் சீட்டுகளை வழங்கிப் பார்க்கவும்",
        "titlePatient": "எனது மருந்துச் சீட்டுகள்",
        "issueTitle": "புதிய மருந்துச் சீட்டை வழங்கவும்",
        "medicines": "மருந்துகள்",
        "dosage": "அளவு",
        "submitBtn": "மருந்துச் சீட்டைச் சமர்ப்பிக்கவும்",
        "loading": "மருந்துச் சீட்டுகள் ஏற்றப்படுகின்றன...",
        "noPrescriptions": "தரவுத்தளத்தில் மருந்துச் சீட்டுகள் இல்லை.",
        "prescBy": "மருந்துச் சீட்டு வழங்கியவர்",
        "dateAdded": "சேர்க்கப்பட்ட தேதி",
        "forPatient": "நோயாளி ஐடிக்காக",
        "downloadPDF": "PDF பதிவிறக்கவும்"
      },
      "video": {
        "title": "நேரடி வீடியோ ஆலோசனை",
        "status": "நிலை",
        "myCamera": "எனது கேமரா",
        "consultFeed": "ஆலோசனை ஊட்டம்",
        "awaiting": "வீடியோ ஸ்டீமிற்காகக் காத்திருக்கிறது...",
        "endCall": "அழைப்பை முடி / துண்டி"
      },
      "admin": {
        "title": "நிர்வாகக் கட்டுப்பாட்டு மையம்",
        "desc": "ஒட்டுமொத்த கணினி மேற்பார்வை மற்றும் பயனர் மேலாண்மை.",
        "totalUsers": "மொத்த பயனர்கள்",
        "totalPrescriptions": "மொத்த மருந்துச் சீட்டுகள்",
        "healthRecords": "சுகாதார பதிவுகள்",
        "pharmacies": "பதிவு செய்யப்பட்ட மருந்தகங்கள்",
        "activityTrend": "ஒட்டுமொத்த செயல்பாட்டு போக்கு",
        "userList": "சமீபத்திய பயனர் பட்டியல்",
        "accessDenied": "நிர்வாக அணுகல் மறுக்கப்பட்டது"
      },
      "roles": {
        "patient": "நோயாளி",
        "doctor": "மருத்துவர்",
        "pharmacy": "மருந்தகம்",
        "admin": "நிர்வாகி",
        "guest": "விருந்தினர்"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n;
