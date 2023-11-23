import 'package:flutter/material.dart';
import 'package:mobile/palette.dart';

// This widget can be used on other pages to set the background.
// Checkout login.dart for For reference on how to use BackgroundImageWidget()
class InputBoxWidget extends StatelessWidget {
  final String hintname;
  final TextStyle hintStyle;
  final TextInputType inputType;
  final TextInputAction inputAction;
  final TextEditingController controller;
  final bool isHide;

  const InputBoxWidget({
    Key? key,
    required this.hintname,
    required this.hintStyle,
    required this.inputType,
    required this.inputAction,
    required this.controller,
    required this.isHide,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) => Container(
        padding: const EdgeInsets.symmetric(horizontal: 12),
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 0),
              child: Container(
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(25),
                ),
                child: TextField(
                  controller: controller,
                  decoration: InputDecoration(
                    contentPadding: const EdgeInsets.symmetric(
                        vertical: 20, horizontal: 15),
                    border: InputBorder.none,
                    hintText: hintname,
                    hintStyle: hintStyle,
                  ),
                  style: landBodyText,
                  keyboardType: inputType,
                  textInputAction: inputAction,
                  obscureText: isHide,
                ),
              ),
            ),
          ],
        ),
      );
}
