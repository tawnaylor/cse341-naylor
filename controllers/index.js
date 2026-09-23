const homePage = (req, res) => {
  res.render('home', { title: 'Welcome Home' });
};

const aboutPage = (req, res) => {
  res.render('about', { title: 'About' });
};

const productsPage = (req, res) => {
  res.render('products', { title: 'Products' });
};

const studentPage = (req, res) => {
  const student = {
    name: 'Taw Naylor',
    id: 'CSE341-001',
    email: 'taw.naylor@example.com',
    address: 'Rexburg, Idaho',
  };

  res.render('student', { title: 'Student Profile', student });
};

module.exports = {
  homePage,
  aboutPage,
  productsPage,
  studentPage,
};
