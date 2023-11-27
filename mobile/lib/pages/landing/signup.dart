import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:get/get.dart';
import 'package:mobile/palette.dart';
import 'package:mobile/utils/helper.dart';
import 'package:mobile/widgets/background_widget.dart';
import 'package:mobile/widgets/inputbox_widget.dart';
import 'package:http/http.dart' as http;

import 'homepage.dart';
import 'login.dart';

class SignupPage extends StatelessWidget {
  const SignupPage({super.key});

  @override
  Widget build(BuildContext context) {
    var firstNameController = TextEditingController();
    var lastNameController = TextEditingController();
    var emailController = TextEditingController();
    var passController = TextEditingController();
    return BackgroundImageWidget(
      image: AssetImage('assets/landing.jpg'),
      child: Scaffold(
        resizeToAvoidBottomInset: true,
        backgroundColor: Colors.transparent,
        appBar: AppBar(
          elevation: 0,
          backgroundColor: Colors.transparent,
          leading: IconButton(
            onPressed: () {
              Get.offAll(() => const HomePage());
            },
            icon: const Icon(
              Icons.arrow_back_ios,
              size: 25,
              color: Colors.white,
            ),
          ),
          title: const Text(
            "Sign up",
            style: TextStyle(
                fontSize: 30, fontWeight: FontWeight.bold, color: Colors.white),
          ),
          centerTitle: true,
          systemOverlayStyle: SystemUiOverlayStyle.dark,
        ),
        body: SingleChildScrollView(
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 40),
            height: MediaQuery.of(context).size.height - 40,
            width: double.infinity,
            child: Column(
              children: <Widget>[
                Column(
                  children: <Widget>[
                    SizedBox(
                      height: MediaQuery.of(context).size.height / 12,
                      // child: const Image(
                      //   colorBlendMode: BlendMode.overlay,
                      //   image: AssetImage('assets/background.png'),
                      // ),
                    ),
                    const Text(
                      "Create an account, It's free",
                      style: TextStyle(fontSize: 16, color: Colors.transparent),
                    ),
                  ],
                ),
                Column(
                  children: <Widget>[
                    makeInput(
                        label: "First Name",
                        controller: firstNameController,
                        obscureText: false),
                    makeInput(
                        label: "Last Name",
                        controller: lastNameController,
                        obscureText: false),
                    makeInput(
                        label: "Email",
                        controller: emailController,
                        obscureText: false),
                    makeInput(
                        label: "Password",
                        obscureText: true,
                        controller: passController),
                  ],
                ),
                Container(
                  padding: const EdgeInsets.only(top: 3, left: 3),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(50),
                  ),
                  child: MaterialButton(
                    minWidth: double.infinity,
                    height: 60,
                    onPressed: () {
                      singupUser(emailController, passController,
                          firstNameController, lastNameController);
                    },
                    color: const Color.fromRGBO(107, 99, 255, 1),
                    elevation: 0,
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(50)),
                    child: const Text(
                      "Sign up",
                      style: TextStyle(
                          fontWeight: FontWeight.w600,
                          fontSize: 20,
                          color: Colors.white),
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(top: 8.0),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      const Text(
                        "Already have an account?",
                        style: TextStyle(color: Colors.white),
                      ),
                      GestureDetector(
                        onTap: () {
                          Get.to(() => const LoginPage());
                        },
                        child: const Text(
                          " Login",
                          style: TextStyle(
                              fontWeight: FontWeight.w600,
                              fontSize: 18,
                              color: Color.fromRGBO(125, 255, 99, 1)),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget makeInput({label, obscureText, required controller}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        Text(
          label,
          style: const TextStyle(
              fontSize: 15, fontWeight: FontWeight.w400, color: Colors.white),
        ),
        const SizedBox(
          height: 5,
        ),
        InputBoxWidget(
            hintname: label,
            hintStyle: landBodyText,
            inputType: TextInputType.text,
            controller: controller,
            inputAction: TextInputAction.next,
            isHide: obscureText),
        const SizedBox(
          height: 20,
        ),
      ],
    );
  }

  void singupUser(
    TextEditingController emailController,
    TextEditingController passController,
    TextEditingController firstNameController,
    TextEditingController lastNameController,
  ) async {
    const apiUrl =
        'https://myculinarycompass-0c8901cce626.herokuapp.com/auth/register';

    try {
      final response = await http.post(
        Uri.parse(apiUrl),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode({
          "firstName": firstNameController.text,
          "lastName": lastNameController.text,
          "email": emailController.text,
          "password": passController.text,
        }),
      );

      if (response.statusCode == 201) {
        // Post created successfully
        print('User registered');
        Get.snackbar(
          'Signup Success',
          'Your account has been successfully created!'
              'A verification token has been sent to your email!',
          backgroundColor: Colors.green,
          colorText: Colors.white,
        );
        Get.to(() => const HomePage());
      } else {
        // Handle error
        print('Failed to register user');
      }
    } catch (error) {
      print('Error: $error');
    }
  }
}
