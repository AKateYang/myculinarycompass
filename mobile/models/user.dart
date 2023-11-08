import 'dart:convert';

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

  get getemail => email;

  void setEmail(email) => this.email = email;

  get getPassword => password;

  void setPassword(password) => this.password = password;

  get getCpassword => cpassword;

  void setCpassword(cpassword) => this.cpassword = cpassword;

  User(
      {required this.username,
      required this.firstname,
      required this.lastname,
      required this.email,
      required this.password,
      required this.cpassword});

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'login': username,
      'password': password,
      'firstname': firstname,
      'lastname': lastname,
      'email': email,
    };
  }

  factory User.fromMap(Map<String, dynamic> map) {
    return User(
      username: map['email'] as String,
      firstname: map['firstname'] as String,
      lastname: map['lastname'] as String,
      email: map['email'] as String,
      password: map['password'] as String,
      cpassword: map['cpassword'] as String,
    );
  }

  String toJson() => json.encode(toMap());

  factory User.fromJson(String source) =>
      User.fromMap(json.decode(source) as Map<String, dynamic>);
}
