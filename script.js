let language = "en";
let mcqMode = "reveal";
let darkMode = true;
let currentQuestionIndex = 0;
let correctAnswers = 0;
let mcqQuestionsCopy = [];
let isShuffleLocked = false;
let mistakeBank = JSON.parse(localStorage.getItem("mcqMistakes")) || [];
let isShowingMistakes = false;
// --- Data ---
const essayQuestions = {
    en: [
        { id: 1, q: "What is Digital Transformation?", a: "Digital transformation is the integration of digital technology into all areas of a business, fundamentally changing how you operate and deliver value to customers. It's also a cultural change that requires organizations to continually challenge the status quo, experiment, and get comfortable with failure.\n\nConclusion:\nDigital transformation is the integration of digital technology into all areas of a business to improve how it operates and delivers value to customers." },
        { id: 2, q: "What are Pillars & Elements of Digital Transformation? And its Roles?", a: "1) Technology & Infrastructure (cloud, AI, IoT, automation)\n2) Data & Analytics (collecting and leveraging insights)\n3) People & Culture (leadership, skills, adaptability)\n4) Processes & Operations (streamlining workflows, automation)\n5) Customer Experience (personalization, seamless journeys)\n6) Strategy & Leadership (clear vision, agile governance)" },
        { id: 3, q: "Write 6 Benefits of Digital Transformation for Businesses?", a: "1) Enhanced Efficiency\n2) Improved Customer Experience\n3) Increased Agility\n4) Data-Driven Decision-Making\n5) Innovation Opportunities\n6) Scalability and Growth" },
        { id: 4, q: "What are the necessary considerations for measuring the success of digital transformation?", a: "1) Direct business impact\n2) Operational impact\n3) Scope of transformation\n4) Adoption metrics\n5) Availability/reliability\n6) Customer experience\n7) Sustainability" },
        { id: 5, q: "What are Categories of Digital Transformation Tools?", a: "1) Communication & Collaboration (Slack, Teams, Zoom)\n2) Project Management (Asana, Trello, Jira)\n3) CRM Tools (Salesforce, HubSpot)\n4) Cloud Storage (AWS, Azure, Google Cloud)\n5) Data Analytics (Tableau, Power BI)\n6) Marketing Automation (HubSpot, Marketo)\n7) Cybersecurity (Norton, CrowdStrike)" },
        { id: 6, q: "How to Choose the Proper Digital Transformation Tools?", a: "1) Check your desires\n2) Prioritize Integration\n3) Recall Scalability\n4) Examine Usability\n5) Budget accurately" },
        { id: 7, q: "What are Essential Steps for a Successful Digital Transformation?", a: "1) Set Clear Goals\n2) Build a Digital-First Culture\n3) Evaluate Your Current Landscape\n4) Involve Key Stakeholders\n5) Choose the Right Technologies\n6) Implement with Agility\n7) Upskill and Reskill Your Workforce\n8) Prioritize User Experience" },
        { id: 8, q: "List Best Examples of Digital Transformation in Real-world", a: "1) The Digital Transformation of Netflix\n2) NIKE’s Digital Transformation through SNKRS App\n3) Starbucks Using AI Technology to Enhance Customer Satisfaction\n4) AUDI’s Digital Showroom\n5) Adobe’s Digital Transformation\n6) Airbnb Disrupting Hospitality with a Sharing Economy Platform\n7) Amazon Reinventing Retail with Data and Automation" },
        { id: 9, q: "What is a Digital transformation framework?", a: "A strategic roadmap guiding businesses to integrate technology across operations, culture, and customer experience. It provides structure through actionable steps using models like the 5 Ps (People, Process, Platform, Portfolio, Promotion) or MIT's framework." },
{ 
  id: 10, 
  q: "What are the phases of design thinking for digital transformation?", 
  a: "1) Empathize: Understand users and their needs.\n2) Define: Clearly define the problem.\n3) Ideate: Generate multiple creative ideas.\n4) Prototype: Build simple versions of solutions.\n5) Test: Test solutions and improve them using feedback." 
}    ],
ar: [
    {
        id: 1,
        q: "ما هو التحول الرقمي؟",
        a: "التحول الرقمي هو دمج التكنولوجيا الرقمية في جميع مجالات الأعمال، مما يغير بشكل أساسي كيفية عملك وتقديم القيمة للعملاء. وهو أيضًا تغيير ثقافي يتطلب من المؤسسات الاستمرار في تحدي الوضع الراهن، والتجربة، والتعود على الفشل.\n\nالخلاصة:\nالتحول الرقمي هو دمج التكنولوجيا الرقمية في جميع مجالات الأعمال لتحسين كيفية عملها وتقديم القيمة للعملاء."
    },
    {
        id: 2,
        q: "ما هي ركائز وعناصر التحول الرقمي؟ وما أدوارها؟",
        a: "1) التكنولوجيا والبنية التحتية (الحوسبة السحابية، الذكاء الاصطناعي، إنترنت الأشياء، الأتمتة)\n2) البيانات والتحليلات (جمع واستخدام الرؤى)\n3) الأفراد والثقافة (القيادة، المهارات، القدرة على التكيف)\n4) العمليات والتشغيل (تبسيط سير العمل، الأتمتة)\n5) تجربة العملاء (التخصيص، الرحلات السلسة)\n6) الاستراتيجية والقيادة (رؤية واضحة، حوكمة مرنة)"
    },
    {
        id: 3,
        q: "اكتب ست فوائد للتحول الرقمي للشركات؟",
        a: "1) تعزيز الكفاءة\n2) تحسين تجربة العملاء\n3) زيادة المرونة\n4) اتخاذ القرارات المعتمدة على البيانات\n5) فرص الابتكار\n6) القابلية للتوسع والنمو"
    },
    {
        id: 4,
        q: "ما هي الاعتبارات اللازمة لقياس نجاح التحول الرقمي؟",
        a: "1) التأثير المباشر على الأعمال\n2) التأثير التشغيلي\n3) نطاق التحول\n4) مقاييس التبني\n5) التوافر والموثوقية\n6) تجربة العملاء\n7) الاستدامة"
    },
   {
    id: 5,
    q: "ما هي فئات أدوات التحول الرقمي؟",
    a: "1) التواصل والتعاون (Slack، Teams، Zoom)\n2) إدارة المشاريع (Asana، Trello، Jira)\n3) CRM أدوات إدارة علاقات العملاء  (Salesforce، HubSpot)\n4) التخزين السحابي (AWS، Azure، Google Cloud)\n5) تحليلات البيانات (Tableau، Power BI)\n6) أتمتة التسويق (HubSpot، Marketo)\n7) الأمن السيبراني (Norton، CrowdStrike)"
},
    {
        id: 6,
        q: "كيف تختار أدوات التحول الرقمي المناسبة؟",
        a: "1) تحقق من احتياجاتك\n2) إعطاء الأولوية للتكامل\n3) مراعاة القابلية للتوسع\n4) فحص سهولة الاستخدام\n5) وضع الميزانية بدقة"
    },
    {
        id: 7,
        q: "ما هي الخطوات الأساسية لتحول رقمي ناجح؟",
        a: "1) تحديد أهداف واضحة\n2) بناء ثقافة رقمية أولاً\n3) تقييم المشهد الحالي لديك\n4) إشراك أصحاب المصلحة الرئيسيين\n5) اختيار التقنيات المناسبة\n6) التنفيذ بمرونة\n7) رفع وإعادة تأهيل مهارات القوى العاملة\n8) إعطاء الأولوية لتجربة المستخدم"
    },
    {
        id: 8,
        q: "اذكر أفضل أمثلة للتحول الرقمي في العالم الحقيقي.",
        a: "1) التحول الرقمي لشركة نتفليكس\n2) التحول الرقمي لشركة نايكي من خلال تطبيق SNKRS\n3) استخدام ستاربكس لتقنية الذكاء الاصطناعي لتعزيز رضا العملاء\n4) صالة العرض الرقمية لشركة أودي\n5) التحول الرقمي لشركة أدوبي\n6) إير بي إن بي وتعطيل صناعة الضيافة من خلال منصة الاقتصاد التشاركي\n7) أمازون وإعادة ابتكار تجارة التجزئة باستخدام البيانات والأتمتة"
    },
    {
        id: 9,
        q: "ما هو إطار عمل التحول الرقمي؟",
        a: "هو خارطة طريق استراتيجية توجه الشركات لدمج التكنولوجيا عبر العمليات والثقافة وتجربة العملاء. ويوفر هيكلًا من خلال خطوات قابلة للتنفيذ باستخدام نماذج مثل 5 Ps (الأشخاص، العمليات، المنصة، المحفظة، الترويج) أو إطار MIT."
    },
    {
        id: 10,
        q: "ما هي مراحل التفكير التصميمي للتحول الرقمي؟",
        a: "1) التعاطف: فهم المستخدمين من خلال البحث عن احتياجاتهم ونقاط الألم وتجاربهم.\n2) التحديد: تحليل النتائج لتعريف المشكلة المطلوب حلها بوضوح.\n3) توليد الأفكار: إنشاء العديد من الأفكار الإبداعية لمعالجة المشكلة المحددة.\n4) النموذج الأولي: بناء نسخ بسيطة منخفضة التكلفة من الأفكار لاختبارها بسرعة.\n5) الاختبار: تقييم النماذج الأولية مع المستخدمين لجمع الملاحظات وتحسين الحلول."
    }
]
};


// ... Include the full mcqQuestions [75 items] here from the previous step ...
const mcqQuestions = [
  {
    id: 3,
    question: { en: "What is Digital Transformation?", ar: "ما هو التحول الرقمي؟" },
    options: {
      en: ["Transforming non-digital content into digital format", "Optimizing existing processes leveraging digital capabilities", "New dominant design linking concepts in a new architecture", "Transforming people, processes, and systems to create better products/services"],
      ar: ["تحويل المحتوى غير الرقمي إلى تنسيق رقمي", "تحسين العمليات الحالية بالاستفادة من القدرات الرقمية", "تصميم سائد جديد يربط المفاهيم في بنية جديدة", "تحويل الأشخاص والعمليات والأنظمة لإنشاء منتجات وخدمات أفضل"]
    },
    correct: 3
  },
  {
    id: 4,
    question: { en: "What is the best definition of digital transformation?", ar: "ما هو أفضل تعريف للتحول الرقمي؟" },
    options: {
      en: ["Moving all company data to the cloud", "Implementation of new software to replace old systems", "Reimagining business processes, culture, and customer experiences", "Reducing operating costs through technology"],
      ar: ["نقل جميع بيانات الشركة إلى السحابة", "تنفيذ برامج جديدة لاستبدال الأنظمة القديمة", "إعادة تصور عمليات الأعمال والثقافة وتجارب العملاء", "تقليل التكاليف التشغيلية من خلال التكنولوجيا"]
    },
    correct: 2
  },
  {
    id: 5,
    question: { en: "What is digital disruption?", ar: "ما هو الانقطاع الرقمي (Digital Disruption)؟" },
    options: {
      en: ["Unable to connect to Internet", "Dropping out of Collaborate", "Business transformation resulting from digital technologies", "Use of automation in manufacturing"],
      ar: ["عدم القدرة على الاتصال بالإنترنت", "الخروج من جلسة التعاون", "تحول الأعمال الناتج عن التقنيات الرقمية", "استخدام الأتمتة في عمليات التصنيع"]
    },
    correct: 2
  },
  {
    id: 6,
    question: { en: "Which describes the five domains of digital transformation?", ar: "أي مما يلي يصف المجالات الخمسة للتحول الرقمي؟" },
    options: {
      en: ["Customers, processes, technology, strategy, and people", "Infrastructure, hardware, software, networking, and security", "Marketing, sales, operations, finance, and HR", "Customers, Competition, Data, Innovation, and Value"],
      ar: ["العملاء والعمليات والتكنولوجيا والاستراتيجية والأشخاص", "البنية التحتية والأجهزة والبرامج والشبكات والأمن", "التسويق والمبيعات والعمليات والتمويل والموارد البشرية", "العملاء والمنافسة والبيانات والابتكار والقيمة"]
    },
    correct: 3
  },
  {
    id: 7,
    question: { en: "What are the three main elements (3Ps) of digital transformation?", ar: "ما هي العناصر الثلاثة الرئيسية (3Ps) للتحول الرقمي؟" },
    options: {
      en: ["Price, Promotion, and Place", "People first, Process second, and Platform/Technology third", "Planning, Execution, and Management", "Potential, Performance, and Profit"],
      ar: ["السعر والترويج والمكان", "الأشخاص أولاً، العمليات ثانياً، والمنصة/التكنولوجيا ثالثاً", "التخطيط والتنفيذ والإدارة", "الإمكانات والأداء والربح"]
    },
    correct: 1
  },
  {
    id: 8,
    question: { en: "A key goal of digital transformation is:", ar: "الهدف الرئيسي للتحول الرقمي هو:" },
    options: {
      en: ["Avoiding technological change", "Maintaining current business models", "Future-proofing the business and fostering competitive advantage", "Limiting access to technology for employees"],
      ar: ["تجنب التغيير التكنولوجي", "الحفاظ على نماذج الأعمال الحالية", "تأمين العمل للمستقبل وتعزيز الميزة التنافسية", "تقييد وصول الموظفين إلى التكنولوجيا"]
    },
    correct: 2
  },
  {
    id: 9,
    question: { en: "Which of the following is a major challenge in implementing digital transformation? ", ar: "تحدي رئيسي في تنفيذ التحول الرقمي؟" },
    options: {
      en: ["Lack of available technology", "Lack of sales", "Talent shortage and skill gaps", "Too much customer demand"],
      ar: ["نقص التكنولوجيا المتاحة", "نقص المبيعات", "نقص المواهب وفجوات المهارات", "الكثير من طلب العملاء"]
    },
    correct: 2
  },
  {
    id: 10,
    question: { en: "Which company is a classic example of a digital-first organization?", ar: "أي شركة تعد مثالاً كلاسيكياً للمؤسسات الرقمية؟" },
    options: {
      en: ["Blockbuster Video", "Netflix", "General Motors", "Kodak"],
      ar: ["بلوك باستر", "نتفليكس", "جنرال موتورز", "كوداك"]
    },
    correct: 1
  },
  {
    id: 11,
    question: { en: "In the financial sector, digital transformation is often applied through:", ar: "في القطاع المالي، يتم تطبيق التحول الرقمي من خلال:" },
    options: {
      en: ["Telemedicine", "Mobile applications and online services", "Online retail platforms", "Electronic medical records"],
      ar: ["الطب عن بعد", "تطبيقات الهاتف والخدمات عبر الإنترنت", "منصات التجزئة عبر الإنترنت", "السجلات الطبية الإلكترونية"]
    },
    correct: 1
  },
  {
    id: 12,
    question: { en: "What does 'compute power' refer to?", ar: "إلى ماذا تشير 'قوة الحوسبة'؟" },
    options: {
      en: ["Amount of electricity used", "Physical size of a computer", "Speed at which a computer processes data", "Cost of computer hardware"],
      ar: ["كمية الكهرباء المستخدمة", "الحجم المادي للكمبيوتر", "السرعة التي يعالج بها الكمبيوتر البيانات", "تكلفة أجهزة الكمبيوتر"]
    },
    correct: 2
  },
  {
    id: 13,
    question: { en: "Infrastructure modernization describes:", ar: "تحديث البنية التحتية يصف عملية:" },
    options: {
      en: ["Building new physical offices", "Leveraging hidden value from legacy systems with cloud", "Hiring more IT staff for old systems", "Decreasing number of servers"],
      ar: ["بناء مكاتب مادية جديدة", "الاستفادة من القيمة المخفية للأنظمة القديمة باستخدام السحابة", "توظيف المزيد من موظفي تقنية المعلومات للأنظمة القديمة", "تقليل عدد الخوادم"]
    },
    correct: 1
  },
  {
    id: 14,
    question: { en: "Domains of digital transformation include:", ar: "تشمل مجالات التحول الرقمي:" },
    options: {
      en: ["Competition, customers, data, value, and patents", "Customers, data, and innovation", "Value, competition, customers, data, and innovation", "Customer networks, big data, and innovation"],
      ar: ["المنافسة والعملاء والبيانات والقيمة وبراءات الاختراع", "العملاء والبيانات والابتكار", "القيمة والمنافسة والعملاء والبيانات والابتكار", "شبكات العملاء والبيانات الضخمة والابتكار"]
    },
    correct: 2
  },
  {
    id: 15,
    question: { en: "'Strategic theme of “build platforms, not just products” is related to the domain of:", ar: "ثيم 'بناء المنصات لا المنتجات فقط' يتعلق بمجال:" },
    options: { en: ["Competition", "Data", "Innovation", "Value"], ar: ["المنافسة", "البيانات", "الابتكار", "القيمة"] },
    correct: 0
  },
  {
    id: 16,
    question: { en: "Distinctive characteristic of the big data is NOT:", ar: "ما الذي لا يعد من خصائص البيانات الضخمة؟" },
    options: { en: ["Structure", "Volume", "Velocity", "Variety"], ar: ["الهيكل (Structure)", "الحجم", "السرعة", "التنوع"] },
    correct: 0
  },
  {
    id: 17,
    question: { en: "Major challenge when dealing with data?", ar: "تحدي كبير عند التعامل مع البيانات؟" },
    options: {
      en: ["Storing data efficiently", "Generating enough data", "Turning data into valuable insights", "Avoiding unstructured data"],
      ar: ["تخزين البيانات بكفاءة", "توليد بيانات كافية", "تحويل البيانات إلى رؤى قيمة", "تجنب البيانات غير المهيكلة"]
    },
    correct: 2
  },
  {
    id: 18,
    question: { en: "In an analog era, value proposition was:", ar: "في العصر التناظري، كان عرض القيمة يتميز بـ:" },
    options: {
      en: ["Defined by industry", "Defined by changing customer needs", "Required to adapt at any moment", "Defined by digital platforms"],
      ar: ["محدد بواسطة الصناعة", "محدد باحتياجات العملاء المتغيرة", "مطالب بالتكيف في أي لحظة", "محدد بالمنصات الرقمية"]
    },
    correct: 0
  },
  {
    id: 19,
    question: { en: "Netflix is an example in which industry?", ar: "نتفليكس مثال للتحول الرقمي في أي صناعة؟" },
    options: { en: ["Automotive", "Healthcare", "Entertainment", "Education"], ar: ["السيارات", "الرعاية الصحية", "الترفيه", "التعليم"] },
    correct: 2
  },
  {
    id: 20,
    question: { en: "What does digital transformation require from an organisation?", ar: "التحول الرقمي يتطلب من المؤسسة:" },
    options: {
      en: ["Avoiding technology", "No change at all", "Cultural and organizational change", "Reducing digital systems"],
      ar: ["تجنب التكنولوجيا", "عدم التغيير على الإطلاق", "تغيير ثقافي وتنظيمي", "تقليل الأنظمة الرقمية"]
    },
    correct: 2
  },
  {
    id: 21,
    question: { en: "Amazon's transformation is best described as:", ar: "تحول أمازون يوصف بأنه:" },
    options: {
      en: ["Traditional bookstore expansion", "Data-driven and customer-focused e-commerce innovation", "Closed physical stores only", "Delivery by fax"],
      ar: ["توسع مكتبة تقليدية", "ابتكار تجارة إلكترونية قائم على البيانات ومتمحور حول العميل", "إغلاق المتاجر المادية فقط", "التوصيل عبر الفاكس"]
    },
    correct: 1
  },
  {
    id: 22,
    question: { en: "Why is future-proofing important?", ar: "لماذا يعد تأمين المستقبل (Future-proofing) مهماً؟" },
    options: {
      en: ["To prevent hiring", "To delay innovation", "To adapt to future disruptions", "To block internet access"],
      ar: ["لمنع التوظيف", "لتأخير الابتكار", "للتكيف مع الانقطاعات المستقبلية", "لحظر الوصول للإنترنت"]
    },
    correct: 2
  },
  {
    id: 23,
    question: { en: "What tool did the retailer implement for better inventory management?", ar: "أداة لإدارة المخزون بشكل أفضل؟" },
    options: {
      en: ["Manual logs", "Real-time inventory visibility", "Hand-written receipts", "Barcode scanners only"],
      ar: ["السجلات اليدوية", "رؤية المخزون في الوقت الفعلي", "الإيصالات المكتوبة بخط اليد", "ماسحات الباركود فقط"]
    },
    correct: 1
  },
  {
    id: 24,
    question: { en: "Tesla transformed automotive focusing on:", ar: "حولت تسلا صناعة السيارات بالتركيز على:" },
    options: {
      en: ["Gasoline performance", "Autonomous and connected vehicles", "Manual driving", "Taxi dispatch systems"],
      ar: ["أداء البنزين", "المركبات ذاتية القيادة والمتصلة", "القيادة اليدوية", "أنظمة إرسال التاكسي"]
    },
    correct: 1
  },
  {
    id: 25,
    question: { en: "Digital transformation is a ______ process.", ar: "التحول الرقمي هو عملية ______." },
    options: { en: ["One-time", "Marketing", "Ongoing", "Seasonal"], ar: ["لمرة واحدة", "تسويقية", "مستمرة", "موسمية"] },
    correct: 2
  },
  {
    id: 26,
    question: { en: "One of the risks of digital transformation is:", ar: "أحد مخاطر التحول الرقمي:" },
    options: {
      en: ["Increased website traffic", "Data privacy concerns", "Better marketing results", "Improved loyalty"],
      ar: ["زيادة حركة الموقع", "مخاوف خصوصية البيانات", "نتائج تسويقية أفضل", "تحسين الولاء"]
    },
    correct: 1
  },
  {
    id: 27,
    question: { en: "Alibaba's transformation involves:", ar: "تحول علي بابا يشمل:" },
    options: {
      en: ["Only retail stores", "E-commerce, payment, and cloud ecosystems", "Coffee shops", "Physical newspapers"],
      ar: ["متاجر التجزئة فقط", "أنظمة التجارة الإلكترونية والدفع والسحابة", "المقاهي", "الصحف المادية"]
    },
    correct: 1
  },
  {
    id: 28,
    question: { en: "What enables customer loyalty in digital retail?", ar: "ما الذي يمكّن ولاء العملاء في التجزئة الرقمية؟" },
    options: {
      en: ["Repetitive advertisements", "Long queues", "Personalized offers and rewards", "Uniform pricing"],
      ar: ["الإعلانات المتكررة", "الطوابير الطويلة", "العروض والمكافآت المخصصة", "التسعير الموحد"]
    },
    correct: 2
  },
  {
    id: 29,
    question: { en: "Which company became synonymous with remote collaboration during COVID-19?", ar: "شركة أصبحت مرادفاً للتعاون عن بعد اثناء كوفيد-19؟" },
    options: { en: ["WhatsApp", "TikTok", "Zoom", "Instagram"], ar: ["واتساب", "تيك توك", "زووم", "إنستغرام"] },
    correct: 2
  },
  {
    id: 30,
    question: { en: "Using digital technologies to create new or modify existing business", ar: "استخدام التقنيات لإنشاء أو تعديل عمليات الأعمال:" },
    options: { en: ["Digitalization", "Emerging", "Diminishing", "Digital transformation"], ar: ["الرقمنة", "الناشئة", "المتلاشية", "التحول الرقمي"] },
    correct: 3
  },
  {
    id: 31,
    question: { en: "Digital Transformation isn't just technology, it's about:", ar: "التحول الرقمي ليس مجرد تكنولوجيا، بل يتعلق بـ:" },
    options: { en: ["Agility", "Consumer behavior", "Life", "People"], ar: ["الرشاقة", "سلوك المستهلك", "الحياة", "الأشخاص"] },
    correct: 3
  },
  {
    id: 32,
    question: { en: "Organization with Hierarchical Structure:", ar: "المؤسسة ذات الهيكل الهرمي:" },
    options: { en: ["Traditional organization", "Digital organization", "Corporation", "E-commerce business"], ar: ["المؤسسة التقليدية", "المؤسسة الرقمية", "شركة مساهمة", "أعمال التجارة الإلكترونية"] },
    correct: 0
  },
  {
    id: 33,
    question: { en: "Team-based organization:", ar: "المؤسسة القائمة على الفريق:" },
    options: { en: ["Traditional organization", "Digital organization", "E-commerce companies", "Government organization"], ar: ["المؤسسة التقليدية", "المؤسسة الرقمية", "شركات التجارة الإلكترونية", "المؤسسة الحكومية"] },
    correct: 1
  },
  {
    id: 34,
    question: { en: "Skills needed for digital economy EXCEPT:", ar: "المهارات المطلوبة للاقتصاد الرقمي باستثناء:" },
    options: { en: ["E-business skills", "Soft skills", "Digital specialist skills", "Manual filing"], ar: ["مهارات الأعمال الإلكترونية", "المهارات الناعمة", "مهارات المتخصص الرقمي", "الأرشفة اليدوية"] },
    correct: 3
  },
  {
    id: 35,
    question: { en: "Barrier to company success in digital age:", ar: "عائق لنجاح الشركة في العصر الرقمي:" },
    options: { en: ["Organizational culture", "People", "Digitalization", "Innovation"], ar: ["الثقافة التنظيمية", "الأشخاص", "الرقمنة", "الابتكار"] },
    correct: 0
  },
  {
    id: 36,
    question: { en: "Digital natives look for what in employment?", ar: "عن ماذا يبحث المواطنون الرقميون في التوظيف؟" },
    options: { en: ["Self fulfillment", "Change", "Freedom", "All of the answers"], ar: ["تحقيق الذات", "التغيير", "الحرية", "كل ما سبق"] },
    correct: 3
  },
  {
    id: 37,
    question: { en: "Companies in digital era need to:", ar: "الشركات في العصر الرقمي تحتاج إلى:" },
    options: { en: ["Digitalize", "Adapt", "Respond quicker", "Change"], ar: ["الرقمنة", "التكيف", "الاستجابة بشكل أسرع", "التغيير"] },
    correct: 2
  },
  {
    id: 38,
    question: { en: "Which factors drive change in businesses?", ar: "ما العوامل التي تحرك التغيير في الأعمال؟" },
    options: { en: ["Automation, integration, and disruption", "Manual processes and isolation", "Traditional marketing", "Manual processes and disruption"], ar: ["الأتمتة والتكامل والانقطاع", "العمليات اليدوية والعزلة", "التسويق التقليدي", "العمليات اليدوية والانقطاع"] },
    correct: 0
  },
  {
    id: 39,
    question: { en: "Role of Big Data and Analytics?", ar: "دور البيانات الضخمة والتحليلات؟" },
    options: { en: ["Creating financial data", "Making informed decisions", "Ensuring operational efficiencies", "Reduced machine performance"], ar: ["إنشاء بيانات مالية", "اتخاذ قرارات مدروسة", "ضمان الكفاءة التشغيلية", "تقليل أداء الآلات"] },
    correct: 1
  },
  {
    id: 40,
    question: { en: "Benefit of cloud computing?", ar: "من فوائد الحوسبة السحابية؟" },
    options: { en: ["Increased efficiency", "Enhanced user engagement", "Improved cybersecurity", "Stored large knowledge"], ar: ["زيادة الكفاءة", "تعزيز مشاركة المستخدم", "تحسين الأمن السيبراني", "تخزين المعرفة الكبيرة"] },
    correct: 0
  },
  {
    id: 41,
    question: { en: "Role of AI and Virtual Reality?", ar: "دور الذكاء الاصطناعي والواقع الافتراضي؟" },
    options: { en: ["Protecting sensitive information", "Connecting devices", "Creating a close space", "Enhancing user engagement"], ar: ["حماية المعلومات الحساسة", "توصيل الأجهزة", "إنشاء مساحة مغلقة", "تعزيز مشاركة المستخدم"] },
    correct: 3
  },
  {
    id: 42,
    question: { en: "Importance of good digital strategy?", ar: "أهمية الاستراتيجية الرقمية الجيدة؟" },
    options: { en: ["Boost efficiency", "Foster device communication", "Achieve success and adapt to new technologies", "Increase profits significantly"], ar: ["تعزيز الكفاءة", "تعزيز تواصل الأجهزة", "النجاح والتكيف مع التقنيات الجديدة", "زيادة الأرباح بشكل كبير"] },
    correct: 2
  },
  {
    id: 43,
    question: { en: "Purpose of digital transformation?", ar: "الغرض من التحول الرقمي؟" },
    options: { en: ["Disrupt traditional processes", "Optimize operations", "Reduce user experience", "Upgrade software"], ar: ["تعطيل العمليات التقليدية", "تحسين العمليات", "تقليل تجربة المستخدم", "تحديث البرمجيات"] },
    correct: 1
  },
  {
    id: 44,
    question: { en: "How can digital transformation improve operations?", ar: "كيف يحسن التحول الرقمي العمليات؟" },
    options: { en: ["Upgrading processes", "Increasing disruption", "Minimizing data-driven approach", "Using hardware"], ar: ["تطوير العمليات", "زيادة الانقطاع", "تقليل النهج القائم على البيانات", "استخدام الأجهزة"] },
    correct: 0
  },
  {
    id: 45,
    question: { en: "Enhance user experience through:", ar: "تعزيز تجربة المستخدم من خلال:" },
    options: { en: ["Data-driven decision making", "Minimizing disruption", "Boosting software and hardware", "Maximizing performance"], ar: ["اتخاذ القرار القائم على البيانات", "تقليل الانقطاع", "تعزيز البرامج والأجهزة", "زيادة الأداء"] },
    correct: 2
  },
  {
    id: 46,
    question: { en: "Blockchain is known for:", ar: "يشتهر البلوكشين بـ:" },
    options: { en: ["Securing transactions", "Network security impact", "Space exploration", "Technological innovation"], ar: ["تأمين المعاملات", "تأثير أمن الشبكة", "استكشاف الفضاء", "الابتكار التكنولوجي"] },
    correct: 0
  },
  {
    id: 47,
    question: { en: "New security measure from IT?", ar: "إجراء أمني جديد من قسم المعلومات؟" },
    options: { en: ["Cloud computing", "Biometrics", "Data management", "AI"], ar: ["الحوسبة السحابية", "البصمات الحيوية (Biometrics)", "إدارة البيانات", "الذكاء الاصطناعي"] },
    correct: 1
  },
  {
    id: 48,
    question: { en: "What is the role of the new security measures?", ar: "دور المقاييس الحيوية في الأمن؟" },
    options: { en: ["Ensure that only authorized individuals are given access", "Run complex algorithms", "Check encrypted emails", "Updating passwords"], ar: ["ضمان وصول المصرح لهم فقط", "تشغيل خوارزميات معقدة", "فحص البريد المشفر", "تحديث كلمات المرور"] },
    correct: 0
  },
  {
    id: 49,
    question: { en: "Keep financial records ... reach of unauthorized personnel.", ar: "ابقِ السجلات المالية ... متناول الأفراد غير المصرح لهم." },
    options: { en: ["To", "Between", "Out", "At"], ar: ["إلى", "بين", "خارج", "عند"] },
    correct: 2
  },
  {
    id: 50,
    question: { en: "Which is NOT a digital transformation tool?", ar: "ما الذي لا يعد أداة للتحول الرقمي؟" },
    options: { en: ["Email", "Social media", "Traditional letter writing", "Cloud computing"], ar: ["البريد الإلكتروني", "وسائل التواصل الاجتماعي", "كتابة الرسائل التقليدية", "الحوسبة السحابية"] },
    correct: 2
  },
  {
    id: 51,
    question: { en: "What digital services does the Egyptian state provide to help you accomplish your daily tasks?", ar: "الخدمات الرقمية التي تقدمها الدولة المصرية تشمل:" },
    options: { en: ["Social media access", "Online shopping discounts", "Digital services include bill payment, government service access, and online permit applications", "Streaming subscriptions"], ar: ["الوصول للتواصل الاجتماعي", "خصومات تسوق", "دفع الفواتير والوصول للخدمات الحكومية", "اشتراكات البث"] },
    correct: 2
  },
  {
    id: 52,
    question: { en: "Digital transformation impact on consumer behavior?", ar: "تأثير التحول الرقمي على سلوك المستهلك؟" },
    options: { en: ["Personalized experiences and improved service", "No impact at all", "Only affects large corps", "Irrelevant"], ar: ["تجارب مخصصة وخدمة محسنة", "لا يوجد تأثير", "يؤثر فقط على الشركات الكبرى", "غير ذي صلة"] },
    correct: 0
  },
  {
    id: 53,
    question: { en: "How does the Egyptian government support the growth of digital skills among its citizens? ", ar: "كيف تدعم مصر المهارات الرقمية؟" },
    options: { en: ["Does not prioritize", "Promotes digital skills through educational programs and partnerships with tech companies", "Focuses only on basic education", "Provides limited resources for digital skills training"], ar: ["لا تعطي أولوية", "برامج تعليمية وشراكات مع شركات التكنولوجيا", "تركز فقط على التعليم الأساسي", "موارد محدودة"] },
    correct: 1
  },
  {
    id: 54,
    question: { en: "What are Digital Transformation Tools?", ar: "ما هي أدوات التحول الرقمي؟" },
    options: { en: ["Digital Transformation Tools are technologies that enable organizations to enhance processes and customer experiences through digital capabilities.", "Digital Transformation Tools are manual processes that require no technology", "Digital Transformation Tools are only used for data storage", "Digital Transformation Tools are exclusively for financial transactions"], ar: ["تقنيات تمكن من تحسين العمليات", "عمليات يدوية", "لتخزين البيانات فقط", "للمعاملات المالية فقط"] },
    correct: 0
  },
  {
    id: 55,
    question: { en: "What is Digital Egypt?", ar: "ما هي منصة مصر الرقمية؟" },
    options: { en: ["An online marketplace for Egyptian goods", "A social media platform for sharing Egyptian art.", "A government website for tourism information", "A digital initiative to preserve and provide access to Egypt's cultural heritage"], ar: ["سوق إلكتروني", "تواصل اجتماعي للفن", "معلومات سياحية", "بوابة الخدمات الحكومية الرقمية"] },
    correct: 3
  },
  {
    id: 56,
    question: { en: "What are Electronic Payment Tools?", ar: "ما هي أدوات الدفع الإلكتروني؟" },
    options: { en: ["Investment tools for stocks", "Electronic payment tools are digital methods for transferring money online", "Banking services for loans", "Physical cash payment methods"], ar: ["استثمار الأسهم", "طرق رقمية لتحويل الأموال", "خدمات القروض", "النقد المادي"] },
    correct: 1
  },
  {
    id: 57,
    question: { en: "What are Collaboration and Communication Tools?", ar: "ما هي أدوات التعاون والتواصل؟" },
    options: { en: ["Software applications that enhance teamwork and information sharing", "Tools for individual productivity", "Applications for graphic design", "Software for data analysis"], ar: ["برمجيات تعزز العمل الجماعي", "الإنتاجية الفردية", "التصميم الجرافيكي", "تحليل البيانات"] },
    correct: 0
  },
  {
    id: 58,
    question: { en: "Using Digital Egypt portal is considered:", ar: "استخدام بوابة مصر الرقمية يعتبر:" },
    options: { en: ["Hacking", "Digital transformation tool", "Irresponsible use", "Trespassing"], ar: ["اختراق", "أداة تحول رقمي", "استخدام غير مسؤول", "تعدي إلكتروني"] },
    correct: 1
  },
  {
    id: 59,
    question: { en: "You can use electronic payment applications through the application........ ", ar: "يمكنك استخدام تطبيقات الدفع الالكتروني بواسطة تطبيق؟" },
    options: { en: ["INSTAPAY", "Google Meet", "WhatsApp", "Email"], ar: ["إنستا باي (INSTAPAY)", "جوجل ميت", "واتساب", "البريد الإلكتروني"] },
    correct: 0
  },
  {
    id: 60,
    question: { en: "One of common trait between green tech and digital transformation?", ar: "سمة مشتركة بين التكنولوجيا الخضراء والتحول الرقمي؟" },
    options: { en: ["Communication difficulty", "Slow procedures", "Quick and secure access to services", "Data breaches"], ar: ["صعوبة التواصل", "بطء الإجراءات", "وصول سريع وآمن للخدمات", "خرق البيانات"] },
    correct: 2
  },
  {
    id: 61,
    question: { en: "Green tech and digital tools work to:", ar: "التكنولوجيا الخضراء وأدوات التحول الرقمي تعمل على:" },
    options: { en: ["Increase pollution", "Reduce harm to environment", "Raise raw material consumption", "Increase cost"], ar: ["زيادة التلوث", "تقليل الضرر بالبيئة", "رفع استهلاك المواد الخام", "زيادة التكلفة"] },
    correct: 1
  },
  {
    id: 62,
    question: { en: "Benefits of implementing green technology in urban areas?", ar: "فوائد تطبيق التكنولوجيا الخضراء في المناطق الحضرية؟" },
    options: { en: ["Increased energy consumption", "Improved air quality and reduced carbon footprint", "Higher costs", "Reliance on fossil fuels"], ar: ["زيادة استهلاك الطاقة", "تحسين جودة الهواء وتقليل البصمة الكربونية", "تكاليف أعلى", "الاعتماد على الوقود الأحفوري"] },
    correct: 1
  },
  {
    id: 63,
    question: { en: "How does digital transformation impact small businesses?", ar: "كيف يؤثر التحول الرقمي على الشركات الصغيرة؟" },
    options: { en: ["Limits market reach", "Provides tools for better customer engagement and operational efficiency", "increases the complexity of business operations", "No significant effect"], ar: ["يحد من الوصول للسوق", "يوفر أدوات للمشاركة والكفاءة", "يزيد من التعقيد", "لا يوجد تأثير"] },
    correct: 1
  },
  {
    id: 64,
    question: { en: "Role of mobile apps in digital transformation?", ar: "دور تطبيقات الهاتف في التحول الرقمي؟" },
    options: { en: ["Primarily entertainment", "Facilitate communication and enhance UX in various services", "Only for gaming", "Not contribute to business processes"], ar: ["للترفيه أساساً", "تسهيل التواصل وتعزيز تجربة المستخدم", "للألعاب فقط", "لا تساهم في العمل"] },
    correct: 1
  },
  {
    id: 65,
    question: { en: "How can digital transformation and Green Tech work together?", ar: "كيف يعمل التحول الرقمي والتكنولوجيا الخضراء معاً؟" },
    options: { en: ["Increase consumption", "Promoting sustainable practices", "Discouraging innovation", "Reducing pollution"], ar: ["زيادة الاستهلاك", "تعزيز الممارسات المستدامة", "تثبيط الابتكار", "تقليل التلوث"] },
    correct: 3
  },
  {
    id: 66,
    question: { en: "Main goal of green technology?", ar: "الهدف الرئيسي للتكنولوجيا الخضراء؟" },
    options: { en: ["Enhance pollution levels for economic benefits", "Create sustainable solutions that reduce environmental impact.", "Promote the use of non-renewable resources", "Increase carbon emissions for industrial growth"], ar: ["تعزيز التلوث", "إنشاء حلول مستدامة", "استخدام موارد غير متجددة", "زيادة انبعاثات الكربون"] },
    correct: 1
  },
  {
    id: 67,
    question: { en: "What is Digital Egypt platform?", ar: "ما هي منصة مصر الرقمية؟" },
    options: { en: ["Private company", "Social media network for Egyptian artists", "Government electronic portal", "Platform for online shopping in Egypt"], ar: ["شركة خاصة", "شبكة اجتماعية", "بوابة إلكترونية حكومية", "منصة تسوق"] },
    correct: 1
  },
  {
    id: 68,
    question: { en: "Main goal of Egypt's national project?", ar: "الهدف الرئيسي للمشروع القومي لمصر؟" },
    options: { en: ["Increase paper processes", "Reduce internet access", "Improve efficiency of government services", "Increase revenue"], ar: ["زيادة العمليات الورقية", "تقليل الوصول للإنترنت", "تحسين كفاءة الخدمات الحكومية", "زيادة الإيرادات"] },
    correct: 2
  },
  {
    id: 69,
    question: { en: "Key challenge in Egypt's digital transformation?", ar: "تحدي رئيسي في تحول مصر الرقمي؟" },
    options: { en: ["Internet infrastructure", "Education levels", "Political instability", "All of the above"], ar: ["البنية التحتية للإنترنت", "مستويات التعليم", "عدم الاستقرار السياسي", "كل ما سبق"] },
    correct: 3
  },
  {
    id: 70,
    question: { en: "Role of Egyptian government in promoting transformation?", ar: "دور الحكومة المصرية في تعزيز التحول؟" },
    options: { en: ["Regulate the technology industry", "Invest in infrastructure", "Provide training and education", "All of the above"], ar: ["تنظيم الصناعة", "الاستثمار في البنية التحتية", "توفير التدريب", "كل ما سبق"] },
    correct: 3
  },
  {
    id: 71,
    question: { en: "Example of green tech initiative in Egypt?", ar: "مثال لمبادرة تكنولوجيا خضراء في مصر؟" },
    options: { en: ["Solar power plants", "Nile Dredging", "Aswan High Dam", "Cairo Metro Expansion"], ar: ["محطات الطاقة الشمسية", "تكريك النيل", "السد العالي", "توسعة مترو القاهرة"] },
    correct: 0
  },
  {
    id: 72,
    question: { en: "How has digital transformation impacted the Egyptian job market?", ar: "تأثير التحول على سوق العمل المصري؟" },
    options: { en: ["Increased unemployment", "No significant impact", "Created new job opportunities", "Led to job losses"], ar: ["زيادة البطالة", "لا يوجد تأثير", "خلق فرص عمل جديدة", "أدى لفقدان وظائف"] },
    correct: 2
  },
  {
    id: 73,
    question: { en: "Potential risks of digital transformation?", ar: "المخاطر المحتملة للتحول الرقمي؟" },
    options: { en: ["Cybersecurity threats", "Job displacement", "Social inequality", "All of the above"], ar: ["تهديدات الأمن السيبراني", "نزوح الوظائف", "عدم المساواة الاجتماعية", "كل ما سبق"] },
    correct: 3
  },
  {
    id: 74,
    question: { en: "Correct order of Design Thinking 5-step process?", ar: "الترتيب الصحيح لخطوات التفكير التصميمي الخمس؟" },
    options: {
      en: ["empathize -> define -> ideate -> prototype -> test", "define -> ideate -> empathize -> test -> prototype", "empathize -> ideate -> test -> define -> prototype", "define -> empathize -> ideate -> prototype -> test"],
      ar: ["التعاطف -> التحديد -> الابتكار -> النموذج الأولي -> الاختبار", "التحديد -> الابتكار -> التعاطف -> الاختبار -> النموذج", "التعاطف -> الابتكار -> الاختبار -> التحديد -> النموذج", "التحديد -> التعاطف -> الابتكار -> النموذج -> الاختبار"]
    },
    correct: 0
  },
  {
    id: 75,
    question: { en: "Main goal of Design Thinking?", ar: "الهدف الرئيسي للتفكير التصميمي؟" },
    options: { en: ["Create new ideas and innovative solutions", "Focus solely on aesthetics", "Eliminate all uncertainties", "Follow strict rules"], ar: ["خلق أفكار جديدة وحلول مبتكرة", "التركيز فقط على الجماليات", "القضاء على كل الشكوك", "اتباع قواعد صارمة"] },
    correct: 0
  },
  {
    id: 76,
    question: { 
      en: "How does design thinking approach the start of a project?", 
      ar: "كيف يبدأ التفكير التصميمي في نهج المشروع؟" 
    },
    options: { 
      en: [
        "With a focus on avoiding discomfort", 
        "Without knowing the answer", 
        "With a clear and defined answer", 
        "By following a strict plan"
      ], 
      ar: [
        "مع التركيز على تجنب عدم الراحة", 
        "بدون معرفة الإجابة مسبقاً", 
        "بإجابة واضحة ومحددة", 
        "باتباع خطة صارمة"
      ] 
    },
    correct: 1
  },
  {
    id: 77,
    question: { 
      en: "Why is embracing ambiguity important in design?", 
      ar: "لماذا يعد احتضان الغموض مهماً في التصميم؟" 
    },
    options: { 
      en: [
        "It limits the number of ideas", 
        "It avoids any form of risk", 
        "It ensures a quick solution", 
        "It helps in finding the right answer"
      ], 
      ar: [
        "يحد من عدد الأفكار", 
        "يتجنب أي شكل من أشكال المخاطرة", 
        "يضمن حلاً سريعاً", 
        "يساعد في الوصول إلى الإجابة الصحيحة"
      ] 
    },
    correct: 3
  }
];

document.getElementById("shuffleToggle").onchange = function() {
    if (this.disabled) return;

    if (this.checked) {
        // If we are on the first question, randomize everything
        if (currentQuestionIndex === 0) {
            mcqQuestionsCopy.sort(() => Math.random() - 0.5);
        } else {
            // Keep what was answered, shuffle the rest
            let past = mcqQuestionsCopy.slice(0, currentQuestionIndex + 1);
            let future = mcqQuestionsCopy.slice(currentQuestionIndex + 1);
            future.sort(() => Math.random() - 0.5);
            mcqQuestionsCopy = [...past, ...future];
        }
    } else {
        // --- FIX IS HERE ---
        // When turning shuffle OFF, revert to original list and reset to question 1
        mcqQuestionsCopy = [...mcqQuestions];
        currentQuestionIndex = 0; 
        correctAnswers = 0; // Optional: reset score since we are starting over
    }

    // Update the UI immediately
    showExamQuestion();
};// --- Core Initialization ---
window.onload = () => { 
    renderEssay(); 
    renderMCQ(); 
};
document.getElementById("retakeBtn").onclick = () => {
    // 1. Reset Variables
    currentQuestionIndex = 0;
    correctAnswers = 0;
    
    // 2. Hide Modal
    document.getElementById("scoreModal").classList.add("hidden");
    
    // 3. Re-Shuffle Logic (Checks if toggle is still on)
    const shuffleTog = document.getElementById("shuffleToggle");
    if(shuffleTog.checked) {
        mcqQuestionsCopy = [...mcqQuestions].sort(() => Math.random() - 0.5);
    } else {
        mcqQuestionsCopy = [...mcqQuestions];
    }
    
    // 4. Restart Exam UI
    showExamQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
// --- Universal Theme & Language Logic ---
document.getElementById("themeBtn").onclick = () => {
    darkMode = !darkMode;
    document.body.className = darkMode ? "dark" : "light";
    document.getElementById("themeBtn").textContent = darkMode ? "☀️" : "🌙";
};

document.getElementById("langBtn").onclick = () => {
    language = language === "en" ? "ar" : "en";
    const isEn = language === "en";

    // 1. General UI
    document.getElementById("langBtn").textContent = isEn ? "AR (العربية)" : "EN (English)";
    document.body.dir = isEn ? "ltr" : "rtl";
    document.getElementById("title").textContent = isEn ? "Digital Transformation" : "ثقافة التحول الرقمي";
    document.getElementById("subtitle").textContent = isEn ? "Study Guide – Data Science Program 2025/2026" : "مراجعة بنك الأسئلة - قسم علوم البيانات 2025/2026";
    document.getElementById("creation").textContent = isEn ? "Made By: Youssef Gaber Samir" : "بواسطة: يوسف جابر سمير";
    document.getElementById("retakeBtn").textContent = isEn ? "Retake Exam" : "إعادة الاختبار";
    // 2. Tabs
    document.getElementById("essayTab").textContent = isEn ? "Essay Questions" : "أسئلة مقالية";
    document.getElementById("mcqTab").textContent = isEn ? "MCQs Questions" : "اسئلة اختيار المتعدد";

    // 3. MCQ Home / Start Card
    document.getElementById("mistakeToggleBtn").textContent = language === "en" ? "Show Only Last Mistaken Questions" : "عرض الأسئلة الخاطئة فقط";
    document.getElementById("mcqStudyTitle").textContent = isEn ? "MCQ Questions" :"اسئلة اختيار المتعدد";
    document.getElementById("startExamBtn").innerHTML = isEn ? "<span>🚀</span> Start Exam Mode" : "<span>🚀</span> بدء وضع الاختبار";

    // 4. Exam Mode UI
    document.getElementById("exitExamBtn").textContent = isEn ? "Switch to Reveal Mode" : "العودة لوضع المراجعة";
    document.getElementById("shuffleText").textContent = isEn ? "Random Shuffle" : "ترتيب عشوائي";

    // 5. Modal / Score
    document.getElementById("modalTitle").textContent = isEn ? "Exam Finished" : "انتهى الاختبار";
    document.getElementById("modalFeedback").textContent = isEn ? "Good Job" : "عمل رائع";
    document.getElementById("modalClose").textContent = isEn ? "Close" : "إغلاق";

    // Refresh Content
    renderEssay();
    renderMCQ();
};

// --- Navigation Tabs ---
document.getElementById("essayTab").onclick = () => {
    switchTab("essaySection", "mcqSection", "essayTab", "mcqTab");
};

document.getElementById("mcqTab").onclick = () => {
    switchTab("mcqSection", "essaySection", "mcqTab", "essayTab");
};

function switchTab(showId, hideId, activeTabId, inactiveTabId) {
    document.getElementById(showId).classList.remove("hidden");
    document.getElementById(hideId).classList.add("hidden");
    document.getElementById(activeTabId).classList.add("active");
    document.getElementById(inactiveTabId).classList.remove("active");
}

// --- Essay Logic ---
function renderEssay() {
    const section = document.getElementById("essaySection");
    section.innerHTML = "";
    essayQuestions[language].forEach(q => {
        const card = document.createElement("div");
        card.className = "card fade-slide-in";
        card.innerHTML = `
            <div class="essay-row" onclick="toggleAnswer(${q.id})">
                <span class="essay-header">${q.id}. ${q.q}</span>
                <span class="toggle-icon" id="icon-${q.id}">∨</span>
            </div>
            <div class="answer-container" id="ans-${q.id}">
                <div class="essay-answer">${q.a}</div>
            </div>`;
        section.appendChild(card);
    });
}

function toggleAnswer(id) {
    const ans = document.getElementById(`ans-${id}`);
    const icon = document.getElementById(`icon-${id}`);
    const isOpen = ans.classList.toggle("show");
    icon.textContent = isOpen ? "∧" : "∨";
}

// --- MCQ Logic ---
function renderMCQ() {
    const list = document.getElementById("mcqList");
    list.innerHTML = "";
    const isShuffleOn = document.getElementById("shuffleToggle").checked;

    if (mcqMode === "reveal") {
        mcqQuestionsCopy = [...mcqQuestions]; 
        list.className = "reveal-mode";
        mcqQuestionsCopy.forEach((q, idx) => renderCard(q, idx, list, false));
    } else {
        // Only initialize the copy if it's empty (first time starting)
        if (mcqQuestionsCopy.length === 0) {
            mcqQuestionsCopy = isShuffleOn ? [...mcqQuestions].sort(() => Math.random() - 0.5) : [...mcqQuestions];
        }
        list.className = "exam-mode";
        showExamQuestion();
    }
}
function renderCard(q, idx, container, isExam) {
    const card = document.createElement("div");
    card.className = "card mcq-card fade-slide-in";
    card.innerHTML = `<span class="question-text">${idx + 1}. ${q.question[language]}</span>`;
    
    const grid = document.createElement("div");
    grid.className = "options-grid";

    q.options[language].forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.textContent = opt;
        
        if (mcqMode === "reveal") {
            if (i === q.correct) btn.classList.add("correct");
            btn.style.pointerEvents = "none"; 
        } else {
            btn.onclick = () => handleOptionClick(btn, i, q.correct, grid, card);
        }
        grid.appendChild(btn);
    });
    card.appendChild(grid);
    container.appendChild(card);
}

document.getElementById("startExamBtn").onclick = () => {
    mcqMode = "exam";
    currentQuestionIndex = 0;
    correctAnswers = 0;
    isShowingMistakes = false; // Reset mistake view if starting exam
    
    document.querySelector(".tabs").classList.add("hidden");
    document.getElementById("mcqHome").classList.add("hidden");
    document.getElementById("examUI").classList.remove("hidden");
    
    renderMCQ();
};

document.getElementById("exitExamBtn").onclick = () => {
    mcqMode = "reveal";
    
    // 1. Reset the Toggle UI and unlock it
    const shuffleTog = document.getElementById("shuffleToggle");
    shuffleTog.checked = false; // Reset visually
    shuffleTog.disabled = false;
    document.getElementById("shuffleToggleWrapper").classList.remove("locked");

    // 2. Standard navigation
    document.querySelector(".tabs").classList.remove("hidden");
    document.getElementById("mcqHome").classList.remove("hidden");
    document.getElementById("examUI").classList.add("hidden");
    
    renderMCQ(); 
};
function handleOptionClick(btn, selected, correct, grid, card) {
    const allBtns = grid.querySelectorAll(".option-btn");
    allBtns.forEach(b => b.disabled = true);
    const currentQuestion = mcqQuestionsCopy[currentQuestionIndex];

    if (selected === correct) {
        btn.classList.add("correct");
        correctAnswers++;
        mistakeBank = mistakeBank.filter(id => id !== currentQuestion.id);
    } else {
        btn.classList.add("wrong");
        allBtns[correct].classList.add("correct");
        if (!mistakeBank.includes(currentQuestion.id)) {
            mistakeBank.push(currentQuestion.id);
        }
    }

    // FADE IN THE EXISTING BUTTON
    const nextBtn = document.getElementById("nextQuestionBtn");
    if (nextBtn) {
        nextBtn.classList.add("show");
    }
    
    card.classList.add("answered-state");
}

function showNextButton(card) {
    const container = document.createElement("div");
    container.className = "next-btn-container";
    
    const btn = document.createElement("button");
    btn.className = "btn-modern";
    btn.style.marginTop = "15px";
    
    const isLast = currentQuestionIndex === mcqQuestionsCopy.length - 1;
    btn.textContent = isLast ? 
        (language === "en" ? "Finish & Show Score" : "انهاء وعرض النتيجة") : 
        (language === "en" ? "Next Question" : "السؤال التالي");

    btn.onclick = () => {
        if (isLast) {
            showScore();
        } else {
            currentQuestionIndex++;
            showExamQuestion();
        }
    };
    container.appendChild(btn);
    card.appendChild(container);
}

function showExamQuestion() {
    const container = document.getElementById("examQuestionContainer");
    container.innerHTML = "";
    const q = mcqQuestionsCopy[currentQuestionIndex];
    const card = document.createElement("div");
    card.className = "card fade-slide-in exam-mode-card";
    
    // Progress Bar
    const progress = (currentQuestionIndex / mcqQuestionsCopy.length) * 100;
    document.getElementById("examProgressBar").style.width = `${progress}%`;

    card.innerHTML = `<span class="question-text">${currentQuestionIndex + 1}. ${q.question[language]}</span>`;
    
    const grid = document.createElement("div");
    grid.className = "options-grid";

    q.options[language].forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.textContent = opt;
        btn.onclick = () => {
            document.getElementById("shuffleToggle").disabled = true;
            document.getElementById("shuffleToggleWrapper").classList.add("locked");
            handleOptionClick(btn, i, q.correct, grid, card);
        };
        grid.appendChild(btn);
    });
    card.appendChild(grid);

    // --- PRE-CREATE THE BUTTON CONTAINER HERE ---
    const nextBtnContainer = document.createElement("div");
    nextBtnContainer.className = "next-btn-container";
    
    const nextBtn = document.createElement("button");
    nextBtn.id = "nextQuestionBtn"; // Fixed ID for CSS
    nextBtn.className = "btn-modern";
    
    const isLast = currentQuestionIndex === mcqQuestionsCopy.length - 1;
    nextBtn.textContent = isLast ? 
        (language === "en" ? "Finish & Show Score" : "انهاء وعرض النتيجة") : 
        (language === "en" ? "Next Question" : "السؤال التالي");

    nextBtn.onclick = () => {
        if (isLast) {
            localStorage.setItem("mcqMistakes", JSON.stringify(mistakeBank));
            showScore();
        } else {
            currentQuestionIndex++;
            showExamQuestion();
        }
    };

    nextBtnContainer.appendChild(nextBtn);
    card.appendChild(nextBtnContainer);
    // --------------------------------------------

    container.appendChild(card);
}
document.getElementById("modalClose").onclick = () => {
    document.getElementById("scoreModal").classList.add("hidden");
    mcqMode = "reveal";
    renderMCQ();
};
function showScore() {
    const modal = document.getElementById("scoreModal");
    modal.classList.remove("hidden");
    document.getElementById("scoreResult").textContent = `${correctAnswers}/${mcqQuestionsCopy.length}`;
    document.getElementById("scorePercent").textContent = `(${Math.round((correctAnswers/mcqQuestionsCopy.length)*100)}%)`;
}
document.getElementById("mistakeToggleBtn").onclick = function() {
    isShowingMistakes = !isShowingMistakes;
    const list = document.getElementById("mcqList");
    
    if (isShowingMistakes) {
        this.textContent = language === "en" ? "Show All Questions" : "عرض كل الأسئلة";
        renderMistakesOnly();
    } else {
        this.textContent = language === "en" ? "Show Only Last Mistaken Questions" : "عرض الأسئلة الخاطئة فقط";
        renderMCQ();
    }
};
document.getElementById("modalClose").onclick = () => {
    document.getElementById("scoreModal").classList.add("hidden");
    mcqMode = "reveal";
    renderMCQ();
    // No saving here anymore, it's already done!
};
function renderMistakesOnly() {
    const list = document.getElementById("mcqList");
    list.innerHTML = "";
    
    // Refresh mistake bank from storage to be safe
    mistakeBank = JSON.parse(localStorage.getItem("mcqMistakes")) || [];

    if (mistakeBank.length === 0) {
        list.innerHTML = `<div class="card">${language === "en" ? "No mistakes found!" : "لا توجد أخطاء حالياً!"}</div>`;
        return;
    }

    const mistakes = mcqQuestions.filter(q => mistakeBank.includes(q.id));
    
    mistakes.forEach((q, idx) => {
        const card = document.createElement("div");
        card.className = "card mcq-card mistake-border fade-slide-in"; 
        card.innerHTML = `<span class="question-text">${idx + 1}. ${q.question[language]}</span>`;
        
        const grid = document.createElement("div");
        grid.className = "options-grid";

        q.options[language].forEach((opt, i) => {
            const btn = document.createElement("button");
            btn.className = "option-btn";
            btn.textContent = opt;
            if (i === q.correct) btn.classList.add("correct");
            btn.style.pointerEvents = "none"; 
            grid.appendChild(btn);
        });
        card.appendChild(grid);
        list.appendChild(card);
    });
}