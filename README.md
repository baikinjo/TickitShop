## Things to note..

- npm install && npm test - to run the test with its coverage
- test case is insde the test-case.ts file inside the folder

## Approaches

Tried to split the updateQuality() function as much as possible.
These are the steps that I take:

1. Categorize item by its name

- 5 Main categories: Legendary, Conjured, Cheese, Concert, and Normal
- Legendary change neither quality nor sellIn
- Conjured degrades its value twice from normal items
- Cheese & Concert increases its quality until sellIn becomes 0
- If the item doesn't belong to any of this category then it is considered as Normal

2. Send the item to the appropriate handler used switch that accepts category params

3. Increase/decrease quality

- check if quality exceeds 50 or falls under 0 to determine edge cases - as much as possible - but not perfect
