import 'dart:convert';

class DashboardRes {
  // bool status;
  // String msg;
  String token;
  String firstName;
  String lastName;
  String id;
  DashboardRes(
      {
      // required this.status,
      // required this.msg,
      required this.token,
      required this.firstName,
      required this.lastName,
      required this.id});

  // get getStatus => status;

  // void setStatus(status) => this.status = status;

  // get getMsg => msg;

  // void setMsg(msg) => this.msg = msg;

  get getToken => token;

  void setToken(token) => this.token = token;

  get getfirstName => firstName;

  void setfirstName(firstName) => this.firstName = firstName;

  get getlastName => lastName;

  void setlastName(lastName) => this.lastName = lastName;

  get getId => id;

  void setId(id) => this.id = id;

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      // 'status': status,
      // 'msg': msg,
      'token': token,
      'firstName': firstName,
      'lastName': lastName,
      'id': id
    };
  }

  factory DashboardRes.fromMap(Map<String, dynamic> map) {
    return DashboardRes(
        // status: map['status'] as bool,
        // msg: map['msg'] as String,
        token: map['token'] as String,
        firstName: map['firstName'] as String,
        lastName: map['lastName'] as String,
        id: map['id'] as String);
  }

  String toJson() => json.encode(toMap());

  factory DashboardRes.fromJson(String source) =>
      DashboardRes.fromMap(json.decode(source) as Map<String, dynamic>);
}
