export type Item = [string, string, number | string | null, number | null];
export type Section = { cat: string; icon: string; items: Item[] };

export const MENU: Section[] = [
  { cat: "Appetizers", icon: "🍟", items: [
    ["Nachos Cheese Chicken", "ناتشوز دجاج بالجبنة", 125, 500],
    ["Fries Loaded Chicken", "بطاطس مقلية محشوة بالدجاج", 88, 350],
    ["Chicken Popcorn Chipotle", "دجاج بوب كورن شيبوتلي", 112, 450],
    ["Quesadillas Chicken", "كيساديالس دجاج", 100, 400],
  ]},
  { cat: "Barbeque", icon: "🔥", items: [
    ["Chicken Tikka Leg", "ساق دجاج تكا", 100, 400],
    ["Chicken Tikka Breast", "صدر دجاج تكا", 88, 350],
    ["Chicken Boti Bihari", "قطع دجاج بيهاري", 112, 450],
    ["Chicken Reshmi Kebab", "كباب دجاج ريشمي", 112, 450],
    ["Beef Boti Bihari", "قطع لحم بقر بيهاري", 125, 500],
    ["Beef Seekh Kebab", "كباب سيخ لحم بقر", 100, 400],
    ["Boti Afghani", "بوتي الأفغاني", 170, 620],
    ["Mixed BBQ Platter", "طبق مشاوي مشكل", 200, 950],
  ]},
  { cat: "Shinwari Karahi", icon: "🍲", items: [
    ["Chicken Karahi Shinwari (Half/Full)", "شنواري دجاج كراهي", "112/175", 450],
    ["Mutton Karahi Shinwari (Half/Full)", "شنواري لحم ضأن كراهي", "100/165", 400],
  ]},
  { cat: "Rolls", icon: "🌯", items: [
    ["Chicken Tikka Chutney Roll", "رول دجاج تكا بالتشتني", 112, 450],
    ["Chicken Bihari Roll", "رول دجاج بيهاري", 150, 600],
    ["Beef Bihari Roll", "رول لحم بقر بيهاري", 125, 500],
    ["Zinger Roll", "رول زينجر", 100, 400],
    ["Special Roll", "رول خاص", 115, 460],
  ]},
  { cat: "Burgers & Sandwiches", icon: "🍔", items: [
    ["Zinger Cheese Burger", "برجر زينجر بالجبنة", 175, 700],
    ["Half Chicken Broast + Bun & Fries", "نصف دجاجة مشوية مع خبز وبطاطس مقلية", 17, 600],
    ["BBQ Chicken Burger", "برجر دجاج مشوي", 16, 450],
    ["Chicken Burger", "برجر دجاج", 15, 400],
  ]},
  { cat: "Tacos & Mexican", icon: "🌮", items: [
    ["Chicken Fajita Tacos (2pc)", "تاكو دجاج فاهيتا قطعتين", 112, 450],
    ["Chicken Tikka Tacos (2pc)", "تاكو دجاج تكا قطعتين", 112, 450],
    ["Chicken Tikka Burrito Bowl", "صحن بوريتو دجاج تكا", 112, 450],
  ]},
  { cat: "Pizzas", icon: "🍕", items: [
    ["Tikka Chicken (Med/Large)", "بيتزا دجاج تكا", "300/425", 1200],
    ["Fajita Chicken (Med/Large)", "بيتزا دجاج فاهيتا", "325/450", 1300],
    ["Kebab Bihari Chicken (Med/Large)", "بيتزا كباب دجاج بيهاري", "300/425", 1200],
    ["Crown Crust Pizza (Med/Large)", "بيتزا قشرة التاج", "45/60", 1000],
  ]},
  { cat: "Drinks", icon: "🥤", items: [
    ["Lassi Mango", "لاسي مانجو", 35, 150],
    ["Falooda Special", "فالودة خاص", 110, 440],
    ["Shake Kit Kat", "هزة كيت كات", 16, 350],
    ["Shake Oreo", "هزة أوريو", 16, 350],
  ]},
  { cat: "Thali", icon: "🍱", items: [
    ["Mixed BBQ Thali", "ثالي مشكل مع مشاوي", 305, 1410],
    ["Leg Tikka Thali", "ثالي مشكل مع تكا ليج", 305, 1410],
  ]},
];
