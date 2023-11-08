class User {
  String username;
  String firstname;
  String lastname;
  String email;
  String password;
  String cpassword;

  get getUsername => username;

  void setUsername(username) => this.username = username;

  get getFirstname => firstname;

  void setFirstname(firstname) => this.firstname = firstname;

  get getLastName => lastname;

  void setLastname(lastname) => this.lastname = lastname;

  get getemail(email) => email;

  void setEmail(email) => this.email = email;

  get getPassword => password;

  void setPassword(password) => this.password = password;

  get getCpassword => cpassword;

  void setCpassword(cpassword) => this.cpassword = cpassword;

  User({
    required this.username,
    required this.firstname,
    required this.lastname,
    required this.email,
    required this.password,
    required this.cpassword
  });

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'login': username,
      'password': password,
      'firstname': firstname,
      'lastname': lastname,
      'email': email,
    };
  }
}
