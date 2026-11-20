
export const books = [
  {
    id: 1,
    title: "Кобзар",
    author: "Тарас Шевченко",
    year: 1840,
    category: "Поезія",
    available: true
  },
  {
    id: 2,
    title: "Чума",
    author: "Альбер Камю",
    year: 1947,
    category: "Філософський роман",
    available: false
  },
  {
    id: 3,
    title: "Процес",
    author: "Франц Кафка",
    year: 1925,
    category: "Філософський роман",
    available: false
  },
  {
    id: 4,
    title: "Старий і море",
    author: "Ернест Гемінґвей",
    year: 1952,
    category: "Повість",
    available: true
  },
  {
    id: 5,
    title: "Міф про Сізіфа",
    author: "Альбер Камю",
    year: 1942,
    category: "Філософське есе",
    available: false
  },
  {
    id: 6,
    title: "1984",
    author: "Джордж Орвелл",
    year: 1949,
    category: "Антиутопія",
    available: false
  }
];

export const readers = [
  {
    id: 1,
    name: "Денис Ранюк",
    email: "denis@gmail.com",
    phone: "+380501112233"
  },
  {
    id: 2,
    name: "Дмитро Усов",
    email: "dima@gmail.com",
    phone: "+380671234567"
  },
  {
    id: 3,
    name: "Андрій Ярмоленко",
    email: "andrii@gmail.com",
    phone: "+380931234567"
  },
  {
    id: 4,
    name: "Марія Бондар",
    email: "maria@gmail.com",
    phone: "+380991234567"
  },
  {
    id: 5,
    name: "Вадим Поляков",
    email: "vadim@gmail.com",
    phone: "+380631234567"
  },
  {
    id: 6,
    name: "Юрій Лисенко",
    email: "yurii@gmail.com",
    phone: "+380671112233"
  },
  {
    id: 7,
    name: "Максим Ткаченко",
    email: "maksym@gmail.com",
    phone: "+380931112233"
  },
  {
    id: 8,
    name: "Єлизавета Підлісна",
    email: "liza@gmail.com",
    phone: "+380991112233"
  }
];

export const loans = [
  {
    id: 1,
    bookId: 2,
    readerId: 1,
    issueDate: "2026-11-10",
    returnDate: "2026-11-24",
    actualReturnDate: null,
    status: "Видана",
    note: "Книга перебуває у читача"
  },
  {
    id: 2,
    bookId: 1,
    readerId: 2,
    issueDate: "2026-11-01",
    returnDate: "2026-11-15",
    actualReturnDate: "2026-11-14",
    status: "Повернена",
    note: "Книгу повернено вчасно"
  },
  {
    id: 3,
    bookId: 3,
    readerId: 3,
    issueDate: "2026-11-05",
    returnDate: "2026-11-19",
    actualReturnDate: null,
    status: "Видана",
    note: "Очікується повернення"
  },
  {
    id: 4,
    bookId: 6,
    readerId: 4,
    issueDate: "2026-11-12",
    returnDate: "2026-11-26",
    actualReturnDate: null,
    status: "Видана",
    note: "Книга перебуває у читача"
  },
  {
    id: 5,
    bookId: 4,
    readerId: 5,
    issueDate: "2026-10-20",
    returnDate: "2026-11-03",
    actualReturnDate: "2026-11-02",
    status: "Повернена",
    note: "Книгу повернено вчасно"
  },
  {
    id: 6,
    bookId: 5,
    readerId: 1,
    issueDate: "2026-11-15",
    returnDate: "2026-11-29",
    actualReturnDate: null,
    status: "Видана",
    note: "Очікується повернення"
  },
  {
    id: 7,
    bookId: 1,
    readerId: 6,
    issueDate: "2026-09-02",
    returnDate: "2026-09-16",
    actualReturnDate: "2026-09-15",
    status: "Повернена",
    note: "Книгу повернено раніше терміну"
  },
  {
    id: 8,
    bookId: 4,
    readerId: 7,
    issueDate: "2026-09-10",
    returnDate: "2026-09-24",
    actualReturnDate: "2026-09-23",
    status: "Повернена",
    note: "Книгу повернено вчасно"
  },
  {
    id: 9,
    bookId: 5,
    readerId: 8,
    issueDate: "2026-10-01",
    returnDate: "2026-10-15",
    actualReturnDate: "2026-10-14",
    status: "Повернена",
    note: "Книгу повернено вчасно"
  },
  {
    id: 10,
    bookId: 2,
    readerId: 5,
    issueDate: "2026-10-05",
    returnDate: "2026-10-19",
    actualReturnDate: "2026-10-18",
    status: "Повернена",
    note: "Книгу повернено раніше терміну"
  },
  {
    id: 11,
    bookId: 3,
    readerId: 6,
    issueDate: "2026-10-12",
    returnDate: "2026-10-26",
    actualReturnDate: "2026-10-25",
    status: "Повернена",
    note: "Книгу повернено вчасно"
  },
  {
    id: 12,
    bookId: 6,
    readerId: 8,
    issueDate: "2026-10-18",
    returnDate: "2026-11-01",
    actualReturnDate: "2026-10-30",
    status: "Повернена",
    note: "Книгу повернено раніше терміну"
  }
];
