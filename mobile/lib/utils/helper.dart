import 'dart:convert';

import 'package:flutter/services.dart';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import 'package:mobile/models/dashboard_res.dart';
import 'package:mobile/models/login_response.dart';
import 'package:mobile/models/loginuser.dart';
import 'package:mobile/models/sign_response.dart';
import 'package:mobile/pages/saved.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../models/user.dart';

// The 10.0.2.2:5000 is for localhost
// '10.0.2.2:5000'
// localhost:5000
// const addr = '10.0.2.2:5000';
const addr = 'www.myculinarycompass.com';
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

    var url = Uri.http(addr, 'posts/getUserPosts/$userId');
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

    var url = Uri.http(addr, 'posts/getUserPosts/$userId');
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

Future<List<String>> fetchData(String apiUrl) async {
  final response = await http.get(Uri.parse(apiUrl));

  if (response.statusCode == 200) {
    // If the server returns a 200 OK response, parse the JSON
    List<dynamic> data = json.decode(response.body);
    List<String> followersList = List<String>.from(data);
    return followersList;
  } else {
    // If the server did not return a 200 OK response, throw an exception
    throw Exception('Failed to load followers');
  }
}

Future<String> fetchUserName() async {
  final SharedPreferences prefs = await SharedPreferences.getInstance();
  final String? userDataString = prefs.getString('user_data');

  if (userDataString != null) {
    Map<String, dynamic> userData = jsonDecode(userDataString);
    Map<String, String> headers = {'Content-type': 'application/json'};
    var userId = userData['id'];

    var url = Uri.http(addr, 'users/$userId');
    final response = await http.get(url, headers: headers);

    if (response.statusCode == 200) {
      var name = capitalize(userData['firstName']) +
          " " +
          capitalize(userData['lastName']);

      return name;
    } else {
      throw Exception('Failed to fetch user data');
    }
  } else {
    throw Exception('User data not found');
  }
}

Future<Map<String, dynamic>> fetchUserFollow() async {
  final SharedPreferences prefs = await SharedPreferences.getInstance();
  final String? userDataString = prefs.getString('user_data');

  if (userDataString != null) {
    Map<String, dynamic> userData = jsonDecode(userDataString);
    Map<String, String> headers = {'Content-type': 'application/json'};
    var userId = userData['id'];

    var url = Uri.http(addr, 'users/$userId/$userId');
    final response = await http.patch(url, headers: headers);

    if (response.statusCode == 200) {
      Map<String, dynamic> responseData = jsonDecode(response.body);

      var currentUserFollowing = responseData['currentUserFollowing'];
      var currentUserFollowers = responseData['currentUserFollowers'];

      var total = {
        'currentUserFollowing': currentUserFollowing,
        'currentUserFollowers': currentUserFollowers,
        'nowFollowing': responseData['nowFollowing'],
      };

      return total;
    } else {
      throw Exception('Failed to fetch follower&following data');
    }
  } else {
    throw Exception('User data not found');
  }
}

String capitalize(String input) {
  return input.isNotEmpty ? input[0].toUpperCase() + input.substring(1) : input;
}

Future<List<String>> fetchPosts() async {
  // await Future.delayed(Duration(seconds: 2));
  // return List.generate(
  //     9, (index) => '../backend/public/assets/post$index.jpeg');

  final SharedPreferences prefs = await SharedPreferences.getInstance();
  final String? userDataString = prefs.getString('user_data');

  if (userDataString != null) {
    Map<String, dynamic> userData = jsonDecode(userDataString);
    Map<String, String> headers = {'Content-type': 'application/json'};
    var userId = userData['id'];

    var url = Uri.http(addr, 'posts/getUserPosts/$userId');
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
}

Future<String> fetchProfileImgUrl() async {
  final SharedPreferences prefs = await SharedPreferences.getInstance();
  final String? userDataString = prefs.getString('user_data');

  if (userDataString != null) {
    Map<String, dynamic> userData = jsonDecode(userDataString);
    Map<String, String> headers = {'Content-type': 'application/json'};
    var userId = userData['id'];

    var url = Uri.http(addr, 'users/$userId');
    final response = await http.get(url, headers: headers);

    if (response.statusCode == 200) {
      final Map<String, dynamic>? data = json.decode(response.body);

      if (data != null && data.containsKey('picturePath')) {
        return data['picturePath'] as String;
      } else {
        throw Exception(
            'Failed to extract picturePath from the response data.');
      }
    } else {
      throw Exception(
          'Failed to fetch user data. Status code: ${response.statusCode}');
    }
  } else {
    throw Exception('User data not found');
  }
}

Future<List<String>> fetchRecipeImage() async {
  final SharedPreferences prefs = await SharedPreferences.getInstance();
  final String? userDataString = prefs.getString('user_data');

  if (userDataString != null) {
    Map<String, dynamic> userData = jsonDecode(userDataString);
    Map<String, String> headers = {'Content-type': 'application/json'};
    var userId = userData['id'];

    var url = Uri.http(addr, 'recipes/');
    final response = await http.get(url, headers: headers);

    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);

      // Extract 'filePath' from each post object, handling null values
      final List<String> imageUrls = data
          .map((post) => post['recipes']['picturePath']
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
  throw Exception('Failed to load video URLs');
  // return null;
}

// Future<List<String>> _fetchRecipes() async {
//   // Replace the API URL with your actual API endpoint
//   // const apiUrl =
//   //     'https://myculinarycompass-0c8901cce626.herokuapp.com/recipes';
//   const apiUrl = "http://10.0.2.2:5000/recipes/";

//   try {
//     final response = await http.get(Uri.parse(apiUrl));

//     if (response.statusCode == 200) {
//       // Check if response.body is not null
//       // If the server returns a 200 OK response, parse the data
//       final List<dynamic> data = json.decode(response.body);
//       ;

//       final List<String> imageUrls = data
//           .map((post) => post['picturePath']
//               as String?) // Use String? to handle potential null values
//           .where((filePath) => filePath != null) // Filter out null values
//           .cast<String>() // Cast to non-nullable String
//           .toList();

//       return imageUrls;
//     } else {
//       // If the server did not return a 200 OK response,
//       // throw an exception or handle the error accordingly
//       throw Exception(
//           'Failed to load recipes. Status code: ${response.statusCode}');
//     }
//   } catch (error) {
//     // Handle any other errors that might occur during the HTTP request
//     print('Error: $error');
//     throw Exception('Failed to load recipes');
//   }
// }
