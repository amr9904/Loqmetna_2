export const categories = [
  {
    id: 'weekly_offer',
    ar: 'العرض الأسبوعي',
    icon: '',
  },
  {
    id: 'new',
    ar: 'جديد',
    icon: '',
  },
  {
    id: 'sides_salads',
    ar: 'مقبلات وسلطات',
    icon: '',
  },
  {
    id: 'meals',
    ar: 'الوجبات',
    icon: '',
  },
  {
    id: 'burgers',
    ar: 'البرجر',
    icon: '',
  },
  {
    id: 'shawarma',
    ar: 'شاورما',
    icon: '',
  },
  {
    id: 'crepes',
    ar: 'الكريب',
    icon: '',
  },
  {
    id: 'cold_drinks',
    ar: 'مشروبات باردة',
    icon: '',
  },
];

export const menuItems = [
  // Weekly Offers - 4 items from different categories
  {
    id: 'wo1',
    category: 'weekly_offer',
    title: 'برجر لحم بلاك أنجلوس',
    desc: 'برجر لحم بلاك أنجلوس مع جبنة شيدر وصلصة خاصة',
    price: 120,
    image: '/src/assets/download.jpeg',
    badge: 'خصم 25%',
    originalCategory: 'burgers',
    dateAdded: '2024-03-15'
  },
  {
    id: 'wo2',
    category: 'weekly_offer',
    title: 'شاورما لحم',
    desc: ' شاورما لحم مع صلصة خاصة',
    price: 75,
    image: '/src/assets/shawarma.jpeg',
    badge: 'خصم 20%',
    originalCategory: 'shawarma',
    dateAdded: '2024-03-15'
  },
  {
    id: 'wo3',
    category: 'weekly_offer',
    title: 'وجبة دجاج مشوي',
    desc: 'دجاج مشوي مع أرز وخضروات',
    price: 95,
    image: '/src/assets/meals.jpeg',
    badge: 'خصم 15%',
    originalCategory: 'meals',
    dateAdded: '2024-03-15'
  },
  {
    id: 'wo4',
    category: 'weekly_offer',
    title: 'كريب زنجر',
    desc: '  كريب زنجر مع جبنة شيدر وصلصة خاصة',
    price: 70,
    image: '/src/assets/crepe.jpeg',
    badge: 'خصم 10%',
    originalCategory: 'crepes',
    dateAdded: '2024-03-15'
  },

  // New Items - 4 items from different categories
  {
    id: 'n1',
    category: 'new',
    title: 'برجر لحم بلاك أنجلوس',
    desc: 'برجر لحم بلاك أنجلوس مع جبنة شيدر وصلصة خاصة',
    price: 90,
    image: '/src/assets/download.jpeg',
    badge: 'جديد',
    originalCategory: 'burgers',
    dateAdded: '2024-03-20'
  },
  {
    id: 'n2',
    category: 'new',
    title: 'شاورما دجاج',
    desc: 'شاورما دجاج مع صلصة الثوم والخضروات',
    price: 65,
    image: '/src/assets/shawarma.jpeg',
    badge: 'جديد',
    originalCategory: 'shawarma',
    dateAdded: '2024-03-20'
  },
  {
    id: 'n3',
    category: 'new',
    title: 'وجبة كفتة',
    desc: 'كفتة مشوية مع أرز وخضروات',
    price: 110,
    image: '/src/assets/meals.jpeg',
    badge: 'جديد',
    originalCategory: 'meals',
    dateAdded: '2024-03-20'
  },
  {
    id: 'n4',
    category: 'new',
    title: 'كريب جبنة',
    desc: 'كريب مع جبنة وخضروات',
    price: 60,
    image: '/src/assets/crepe.jpeg',
    badge: 'جديد',
    originalCategory: 'crepes',
    dateAdded: '2024-03-20'
  },

  // One item per category
  {
    id: 'm1',
    category: 'meals',
    title: 'وجبة دجاج مشوي',
    desc: 'دجاج مشوي مع أرز وخضروات',
    price: 95,
    image: '/src/assets/meals.jpeg',
    dateAdded: '2024-03-01'
  },
  {
    id: 'b1',
    category: 'burgers',
    title: 'برجر لحم بلاك أنجلوس',
    desc: 'برجر لحم بلاك أنجلوس مع جبنة شيدر وصلصة خاصة',
    price: 90,
    image: '/src/assets/download.jpeg',
    dateAdded: '2024-03-01'
  },
  {
    id: 's1',
    category: 'shawarma',
    title: 'شاورما دجاج',
    desc: 'شاورما دجاج مع صلصة الثوم',
    price: 65,
    image: '/src/assets/shawarma.jpeg',
    dateAdded: '2024-03-01'
  },
  {
    id: 'c1',
    category: 'crepes',
    title: 'كريب زنجر',
    desc: '  كريب زنجر مع جبنة شيدر وصلصة خاصة',
    price: 70,
    image: '/src/assets/crepe.jpeg',
    dateAdded: '2024-03-01'
  },
  {
    id: 'ss1',
    category: 'sides_salads',
    title: 'سلطة قيصر',
    desc: 'سلطة قيصر مع دجاج مشوي',
    price: 55,
    image: '/src/assets/salad.webp',
    dateAdded: '2024-03-01'
  },
  {
    id: 'cd1',
    category: 'cold_drinks',
    title: 'عصير شعير',
    desc: 'عصير شعير طبيعي',
    price: 20,
    image: '/src/assets/drinks.jpg',
    dateAdded: '2024-03-01'
  }
];

