import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:get/get.dart';
import 'package:mobile/palette.dart';
import 'package:mobile/pages/landing/signup.dart';
import 'package:mobile/utils/helper.dart';
import 'package:mobile/widgets/background_widget.dart';
import 'package:mobile/widgets/inputbox_widget.dart';

import '../../navbar.dart';
import 'homepage.dart';

class LoginPage extends StatelessWidget {
  const LoginPage({super.key});

  @override
  Widget build(BuildContext context) {
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
            "Login Page",
            style: TextStyle(
                fontSize: 28, fontWeight: FontWeight.bold, color: Colors.white),
          ),
          centerTitle: true,
          systemOverlayStyle: SystemUiOverlayStyle.dark,
        ),
        body: SafeArea(
          child: SingleChildScrollView(
            child: SizedBox(
              height: MediaQuery.of(context).size.height * .80,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Expanded(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: <Widget>[
                        Column(
                          children: <Widget>[
                            SizedBox(
                              height: MediaQuery.of(context).size.height / 14,
                              // child: const Image(
                              //   colorBlendMode: BlendMode.overlay,
                              //   image: AssetImage('assets/background.png'),
                              // ),
                            ),
                            const SizedBox(
                              height: 15,
                            ),
                            const Text(
                              "Login to your account",
                              style: TextStyle(
                                  fontSize: 25, color: Colors.transparent),
                            ),
                          ],
                        ),
                        Padding(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 40, vertical: 25),
                          child: Column(
                            children: <Widget>[
                              // InputBoxWidget(
                              //     hintname: "Username",
                              //     hintStyle: landBodyText,
                              //     inputType: TextInputType.text,
                              //     controller: emailController,
                              //     inputAction: TextInputAction.next,
                              //     isHide: false),
                              // InputBoxWidget(
                              //     hintname: "password",
                              //     hintStyle: landBodyText,
                              //     inputType: TextInputType.text,
                              //     controller: passController,
                              //     inputAction: TextInputAction.next,
                              //     isHide: false),
                              makeInput(
                                  label: "Username",
                                  obscureText: false,
                                  controller: emailController),
                              makeInput(
                                  label: "Password",
                                  obscureText: true,
                                  controller: passController),
                            ],
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 40),
                          child: Container(
                            padding: const EdgeInsets.only(top: 3, left: 3),
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(50),
                            ),
                            child: MaterialButton(
                              minWidth: double.infinity,
                              height: 60,
                              onPressed: () {
                                loginUser(emailController, passController);
                              },
                              color: Color.fromARGB(255, 7, 113, 12),
                              elevation: 0,
                              shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(50)),
                              child: const Text(
                                "Login",
                                style: TextStyle(
                                    fontWeight: FontWeight.w600,
                                    fontSize: 24,
                                    color: Colors.white),
                              ),
                            ),
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.only(top: 8.0),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: <Widget>[
                              const Text(
                                "Don't have an account? ",
                                style: TextStyle(color: Colors.white),
                              ),
                              GestureDetector(
                                onTap: () {
                                  Get.to(() => const SignupPage());
                                },
                                child: const Text(
                                  "Sign up",
                                  style: TextStyle(
                                      fontWeight: FontWeight.w600,
                                      fontSize: 18,
                                      color: Color.fromRGBO(125, 255, 99, 1)),
                                ),
                              ),
                            ],
                          ),
                        )
                      ],
                    ),
                  ),
                ],
              ),
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
              fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white),
        ),
        const SizedBox(
          height: 5,
        ),
        InputBoxWidget(
            hintname: 'Enter ' + label,
            hintStyle: landBodyText,
            inputType: TextInputType.text,
            controller: controller,
            inputAction: TextInputAction.next,
            isHide: obscureText),
        // TextField(
        //   controller: controller,
        //   obscureText: obscureText,
        //   decoration: const InputDecoration(
        //     contentPadding: EdgeInsets.symmetric(vertical: 0, horizontal: 10),
        //     enabledBorder:
        //         OutlineInputBorder(borderSide: BorderSide(color: Colors.grey)),
        //     border:
        //         OutlineInputBorder(borderSide: BorderSide(color: Colors.grey)),
        //   ),
        // ),
        const SizedBox(
          height: 30,
        ),
      ],
    );
  }
}

void loginUser(emailController, passController) {
  loginUserWithEmail(
    emailController.text.trim(),
    passController.text.trim(),
  ).then((value) => {
        if (value)
          {
            emailController.clear(),
            passController.clear(),
            Future.delayed(const Duration(seconds: 2),
                () => {Get.offAll(() => const DashboardPage())})
          }
      });
}
