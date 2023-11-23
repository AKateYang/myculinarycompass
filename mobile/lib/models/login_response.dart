import 'dart:convert';

class UserRes {
  final String id;
  final String firstName;
  final String lastName;
  // Add other properties as needed

  UserRes({
    required this.id,
    required this.firstName,
    required this.lastName,
    // Initialize other properties
  });

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      '_id': id,
      'firstName': firstName,
      'lastName': lastName,
      // Map other properties
    };
  }

  factory UserRes.fromMap(Map<String, dynamic> map) {
    return UserRes(
      id: map['_id'] as String,
      firstName: map['firstName'] as String,
      lastName: map['lastName'] as String,
      // Map other properties
    );
  }
}

class LoginResponse {
  final String token;
  final UserRes user;

  LoginResponse({
    required this.token,
    required this.user,
  });

  factory LoginResponse.fromMap(Map<String, dynamic> map) {
    return LoginResponse(
      token: map['token'] as String,
      user: UserRes.fromMap(map['user'] as Map<String, dynamic>),
    );
  }

  String toJson() => json.encode(toMap());

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'token': token,
      'user': user.toMap(),
    };
  }

  factory LoginResponse.fromJson(String source) =>
      LoginResponse.fromMap(json.decode(source) as Map<String, dynamic>);
}
