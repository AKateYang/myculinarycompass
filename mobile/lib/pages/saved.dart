import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:mobile/widgets/app_color.dart';
//import 'package:food_recipe/feature/home/model/recipe_model.dart';
//import 'package:food_recipe/feature/home/presentation/widget/recipe_item.dart';

class HomeScrenn extends StatelessWidget {
  const HomeScrenn({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
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
              child: Text(
                "Hello Naomi,",
                style: Theme.of(context)
                    .textTheme
                    .titleLarge
                    ?.copyWith(color: AppColor.primaryColor),
              ),
            ),
            const SizedBox(height: 8),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24),
              child: Text(
                "What you want to cook today ?",
                style: Theme.of(context).textTheme.bodyMedium,
              ),
            ),
            Container(
              margin: const EdgeInsets.all(16),
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppColor.backgroundGray,
                borderRadius: BorderRadius.circular(16),
              ),
              child: Row(
                children: [
                  const Icon(Icons.search),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      "Search Recipes",
                      style: Theme.of(context)
                          .textTheme
                          .bodyMedium
                          ?.copyWith(color: AppColor.blackGrey),
                    ),
                  ),
                ],
              ),
            ),
            Container(
              margin: const EdgeInsets.fromLTRB(16, 0, 16, 0),
              padding: const EdgeInsets.fromLTRB(16, 10, 16, 0),
              decoration: BoxDecoration(
                color: AppColor.primaryColor.withOpacity(0.3),
                borderRadius: BorderRadius.circular(16),
              ),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  //const Icon(Icons.info_outline),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          "New Recipes the Categorires you are subscribed.",
                          style: Theme.of(context).textTheme.bodyMedium,
                        ),
                        TextButton(
                          onPressed: () {},
                          child: Text(
                            "See Recipes",
                            style: Theme.of(context).textTheme.button?.copyWith(
                                  color: AppColor.primaryColor,
                                  decoration: TextDecoration.underline,
                                ),
                          ),
                        )
                      ],
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
                    style: Theme.of(context).textTheme.titleMedium,
                  ),
                  TextButton(
                    onPressed: () {},
                    child: const Text("See All"),
                  )
                ],
              ),
            ),
            const SizedBox(height: 8),
            SizedBox(
              height: 200,
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
                    style: Theme.of(context).textTheme.titleMedium,
                  ),
                  TextButton(
                    onPressed: () {},
                    child: const Text("See All"),
                  )
                ],
              ),
            ),
            const SizedBox(height: 8),
            SizedBox(
              height: 280,
              // child: GridView.count(
              //   //itemCount: trandingRecipes.length,
              //   crossAxisCount: 2,
              //   crossAxisSpacing: 10,
              //   mainAxisSpacing: 10,
              //   scrollDirection: Axis.vertical,
              //   semanticChildCount: trandingRecipes.length,
              //   padding: const EdgeInsets.symmetric(horizontal: 24),
              //   children: List.generate(trandingRecipes.length,
              //       (index) => RecipeItem(recipe: trandingRecipes[index])),
              //   // separatorBuilder: (_, __) {
              //   //   return const SizedBox(width: 16);
              //   // },
              //   // itemBuilder: (context, index) {
              //   //   final recipe = trandingRecipes[index];
              //   //   return RecipeItem(recipe: recipe);
              //   // },
              // ),
            ),
          ],
        ),
      ),
    );
  }
}
