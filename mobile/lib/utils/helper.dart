import 'dart:convert';

import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import 'package:mobile/models/dashboard_res.dart';
import 'package:mobile/models/login_response.dart';
import 'package:mobile/models/loginuser.dart';
import 'package:mobile/models/sign_response.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../models/user.dart';

// The 10.0.2.2:5000 is for localhost
// '10.0.2.2:5000'
// localhost:5000
const addr = 'myculinarycompass-0c8901cce626.herokuapp.com';
// const addr = 'localhost:5000';

Future<bool> loginUserWithEmail(String email, String pass) async {
  if (email.isNotEmpty && pass.isNotEmpty) {
    try {
      var url = Uri.http(addr, 'auth/login');
      var user = LoginUser(email: email, password: pass);
      Map<String, String> headers = {'Content-type': 'application/json'};

      var response =
          await http.post(url, headers: headers, body: user.toJson());
      var data = LoginResponse.fromJson(response.body);

      if (response.statusCode == 200) {
        // Parse user data from the response
        var userData = {
          'token': data.token,
          'firstName': data.user.firstName,
          'lastName': data.user.lastName,
          'id': data.user.id,
        };
        Get.showSnackbar(GetSnackBar(
          title: "Login Successful",
          message: "Loading...",
          snackPosition: SnackPosition.TOP,
          duration: const Duration(seconds: 2),
        ));

        // Save user data to local storage (SharedPreferences in Flutter)
        SharedPreferences prefs = await SharedPreferences.getInstance();
        prefs.setString('user_data', jsonEncode(userData));

        return true;
      } else {
        // Handle unsuccessful login (show error message, etc.)
        return false;
      }
    } catch (e) {
      // Handle any exceptions
      print(e.toString());
      return false;
    }
  } else {
    Get.showSnackbar(const GetSnackBar(
      title: "Login",
      message: "Please fill all details",
      duration: Duration(seconds: 2),
      snackPosition: SnackPosition.TOP,
    ));

    return false;
  }
}

Future<bool> registerUser(String uemail, String pass, String cpass) async {
  if (uemail != '' && pass != '' && cpass != '') {
    var url = Uri.http(addr, 'user/register');
    User user = User(email: uemail, password: pass, cpassword: cpass);
    Map<String, String> headers = {'Content-type': 'application/json'};
    var response = await http.post(url, headers: headers, body: user.toJson());
    var data = SignResponse.fromJson(response.body);

    if (response.statusCode == 200) {
      Get.showSnackbar(GetSnackBar(
        title: "Signup",
        message: "Verify email",
        snackPosition: SnackPosition.TOP,
        duration: const Duration(seconds: 2),
      ));
      return true;
    }
    return false;
  }
  Get.showSnackbar(const GetSnackBar(
    duration: Duration(seconds: 2),
    snackPosition: SnackPosition.TOP,
    title: "Signup",
    message: "Please fill all details",
  ));

  return false;
}

Future<LoginResponse?> getUserProfile() async {
  final SharedPreferences prefs = await SharedPreferences.getInstance();
  final String? userDataString = prefs.getString('user_data');

  if (userDataString != null) {
    Map<String, dynamic> userData = jsonDecode(userDataString);
    return LoginResponse(
      token: userData['token'],
      user: UserRes(
          id: userData['id'],
          firstName: userData['firstName'],
          lastName: userData['lastName']),
    );
  }
  return null;
}

Future<bool> userProfileAvailble() async {
  final SharedPreferences prefs = await SharedPreferences.getInstance();
  final String? userData = prefs.getString('user_data');
  if (userData != null) {
    return true;
  }
  return false;
}

Future<List<String>> fetchImageUrls() async {
  final SharedPreferences prefs = await SharedPreferences.getInstance();
  final String? userDataString = prefs.getString('user_data');

  if (userDataString != null) {
    Map<String, dynamic> userData = jsonDecode(userDataString);
    Map<String, String> headers = {'Content-type': 'application/json'};
    var userId = userData['id'];

    var url = Uri.http(addr, 'posts/$userId');
    final response = await http.get(url, headers: headers);

    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);

      // Extract 'filePath' from each post object, handling null values
      final List<String> imageUrls = data
          .map((post) => post['picturePath']
              as String?) // Use String? to handle potential null values
          .where((filePath) => filePath != null) // Filter out null values
          .cast<String>() // Cast to non-nullable String
          .toList();

      return imageUrls;
    }
    //   } else {
    //     // throw Exception('Failed to load image URLs');
    //   }
  }
  throw Exception('Failed to load image URLs');
  // return null;
}

Future<List<String>> fetchVideoUrls() async {
  final SharedPreferences prefs = await SharedPreferences.getInstance();
  final String? userDataString = prefs.getString('user_data');

  if (userDataString != null) {
    Map<String, dynamic> userData = jsonDecode(userDataString);
    Map<String, String> headers = {'Content-type': 'application/json'};
    var userId = userData['id'];

    var url = Uri.http(addr, 'posts/$userId');
    final response = await http.get(url, headers: headers);

    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);

      // Extract 'filePath' from each post object, handling null values
      final List<String> videoUrls = data
          .map((post) => post['videoPath']
              as String?) // Use String? to handle potential null values
          .where((filePath) => filePath != null) // Filter out null values
          .cast<String>() // Cast to non-nullable String
          .toList();

      return videoUrls;
    }
    //   } else {
    //     // throw Exception('Failed to load image URLs');
    //   }
  }
  throw Exception('Failed to load video URLs');
  // return null;
}
