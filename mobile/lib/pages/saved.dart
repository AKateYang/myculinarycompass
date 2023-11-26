import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:mobile/widgets/app_color.dart';

class SavedRecipes extends StatefulWidget {
  const SavedRecipes({super.key});

  @override
  State<SavedRecipes> createState() => _SavedRecipesState();
}

class _SavedRecipesState extends State<SavedRecipes> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColor.backgroundBlack,
      body: SingleChildScrollView(
        padding: EdgeInsets.only(
          top: MediaQuery.of(context).padding.top + 24,
          bottom: MediaQuery.of(context).padding.bottom + 24,
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    "Hello,",
                    style: Theme.of(context)
                        .textTheme
                        .titleLarge
                        ?.copyWith(color: AppColor.primaryColor),
                  ),
                  // InkWell(
                  //   onTap: () {
                  //     //nav to new Page
                  //     Navigator.of(context).push(MaterialPageRoute(
                  //       builder: (context) {
                  //         return const ShoppingListScreen();
                  //       },
                  //     ));
                  //   },
                  //   child: Container(
                  //     padding: EdgeInsets.all(8),
                  //     child: Image.asset(
                  //       "assets/shopping_cart.png",
                  //       width: 30, // Adjust the width as needed
                  //       height: 30, // Adjust the height as needed
                  //     ),
                  //   ),
                  // ),
                ],
              ),
            ),
            const SizedBox(height: 10),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24),
              child: Text(
                "What you want to cook today ?",
                style: Theme.of(context)
                    .textTheme
                    .bodyMedium
                    ?.copyWith(color: AppColor.white),
              ),
            ),
            Container(
              margin: const EdgeInsets.all(16),
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: AppColor.backgroundGray,
                borderRadius: BorderRadius.circular(16),
              ),
              child: Row(
                children: [
                  //const Icon(Icons.search),
                  const Icon(
                    Icons.search,
                    color: Colors.black,
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: TextField(
                      style: TextStyle(
                        color: AppColor.blackGrey,
                        fontSize: 17,
                      ),
                      decoration: InputDecoration(
                        hintText: "Search Recipes",
                        hintStyle: Theme.of(context)
                            .textTheme
                            .bodyMedium
                            ?.copyWith(color: AppColor.blackGrey),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    "Suggested Recipes",
                    style: Theme.of(context)
                        .textTheme
                        .titleMedium
                        ?.copyWith(color: AppColor.white),
                  ),
                  // TextButton(
                  //   onPressed: () {},
                  //   child: const Text("See All"),
                  // )
                ],
              ),
            ),
            const SizedBox(height: 15),
            SizedBox(
              height: 180,
              // child: ListView.separated(
              //   itemCount: latestRecipes.length,
              //   scrollDirection: Axis.horizontal,
              //   padding: const EdgeInsets.symmetric(horizontal: 24),
              //   separatorBuilder: (_, __) {
              //     return const SizedBox(width: 13);
              //   },
              //   itemBuilder: (context, index) {
              //     final recipe = latestRecipes[index];
              //     return RecipeItem(recipe: recipe);
              //   },
              // ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    "Saved Recipes",
                    style: Theme.of(context)
                        .textTheme
                        .titleMedium
                        ?.copyWith(color: AppColor.white),
                  ),
                  TextButton(
                    onPressed: () {},
                    child: const Text(""),
                  )
                ],
              ),
            ),
            const SizedBox(height: 8),
            SizedBox(
              height: 340,
              child: GridView.count(
                //itemCount: trandingRecipes.length,
                crossAxisCount: 2,
                crossAxisSpacing: 10,
                mainAxisSpacing: 10,
                scrollDirection: Axis.vertical,
                // semanticChildCount: trandingRecipes.length,
                // padding: const EdgeInsets.symmetric(horizontal: 24),
                // children: List.generate(trandingRecipes.length,
                //     (index) => RecipeItem(recipe: trandingRecipes[index])),
                // separatorBuilder: (_, __) {
                //   return const SizedBox(width: 16);
                // },
                // itemBuilder: (context, index) {
                //   final recipe = trandingRecipes[index];
                //   return RecipeItem(recipe: recipe);
                // },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
