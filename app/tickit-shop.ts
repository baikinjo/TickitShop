const LEGENDARY = 'ping-pong paddle'
const CONJURED = 'conjured'
const CHEESE = 'sharp cheddar'
const TICKET = 'lady gaga ticket'
const NORMAL = 'normal'

export class Item {
  name: string
  sellIn: number
  quality: number

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name
    this.sellIn = sellIn
    this.quality = quality
  }
}

export class TickitShop {
  items: Array<Item>

  constructor(items = [] as Array<Item>) {
    this.items = items
  }

  // categorize the item before applying any changes
  private categorizeItem(name: string) {
    // make them lower case to compare
    const lowerCased = name.toLowerCase()

    /**
     * Order starts from legendary, conjured, cheese, and ticket
     * since Legendary does not get affected by anything comes first
     * conjured means it will decrease quality twice faster than regular items
     * cheese or ticket order doesn't matter at this point
     * if an item doesn't belong to any 4 of the category it is considered as a normal item
     */
    if (lowerCased.includes(LEGENDARY)) return LEGENDARY
    if (lowerCased.includes(CONJURED)) return CONJURED
    if (lowerCased.includes(CHEESE)) return CHEESE
    if (lowerCased.includes(TICKET)) return TICKET
    return NORMAL
  }

  // handling legnedary item
  private handleLegendary(item: Item, idx: number) {
    let items = this.items
    /**
     * legendary never has to be sold or decrease quality so if the sellIn is not 0 then change to 0
     * same applies to quality to 80 all the time
     */
    if (item.sellIn !== 0) {
      return (items[idx] = { ...item, sellIn: 0, quality: 80 })
    } else {
      return (items[idx] = { ...item, quality: 80 })
    }
  }

  // handling conjured item
  private handleConjured(item: Item, idx: number) {
    /**
     * Since the item degrades twice faster than the normal item, degrade the item until the quality reaches 0
     * both sellin and quality value stops at 0
     */
    return this.decreaseQuality(item, idx, 2)
  }

  // handle sharp cheddar item
  private handleCheese(item: Item, idx: number) {
    /**
     * Quality of the item increases as it gets old but will degrade when sell in value is at 0
     * First check the item's sellin value and if it is equal to zero then degrade item quality by two
     * if not zero, then increase the item quality by one but decrease the sellin value by one as well
     */
    if (item.sellIn <= 0) {
      this.decreaseQuality(item, idx, 2)
    } else {
      this.increaseQuality(item, idx, 1)
    }
  }

  // handle concert item
  private handleTicket(item: Item, idx: number) {
    let items = this.items

    // quality will be zero when concert date has passed
    if (item.sellIn <= 0) {
      return (items[idx] = { ...item, quality: 0, sellIn: 0 })
    }

    /**
     * check if the concert has less than 10 days left
     * if true, check once more if the concert has less than 5 days left
     * increase the quality depending on the sellIn value
     */
    if (item.sellIn <= 10) {
      if (item.sellIn <= 5) {
        this.increaseQuality(item, idx, 3)
      } else {
        this.increaseQuality(item, idx, 2)
      }
    } else {
      this.increaseQuality(item, idx, 1)
    }
  }

  // handle normal item
  private handleNormal(item: Item, idx: number) {
    if (item.sellIn <= 0) {
      this.decreaseQuality(item, idx, 2)
    } else {
      this.decreaseQuality(item, idx, 1)
    }
  }

  /**
   * This will increase the quality of the item until the maximum of 50
   * once the quality reaches 50, it will stay 50 with varied sellIn value
   * @param item Item that needs to modify the value
   * @param idx position of the item in the original array
   * @param valueToIncrease number of value to increase
   */
  private increaseQuality(item: Item, idx: number, valueToIncrease: number) {
    let items = this.items
    const qualityExceeds = item.quality + valueToIncrease > 50

    return qualityExceeds
      ? (items[idx] = {
          ...item,
          quality: 50,
          sellIn: item.sellIn <= 0 ? 0 : item.sellIn - 1,
        })
      : (items[idx] = {
          ...item,
          quality: item.quality + valueToIncrease,
          sellIn: item.sellIn <= 0 ? 0 : item.sellIn - 1,
        })
  }

  /**
   * This will increase the quality of the item until the minimum of 0
   * once the quality meets 0, it will stay 0 with varied sellIn value
   * @param item Item that needs to modify the value
   * @param idx position of the item in the original array
   * @param valueToIncrease number of value to decrease
   */
  private decreaseQuality(item: Item, idx: number, valueToDecrease: number) {
    let items = this.items
    const qualityFalls = item.quality - valueToDecrease < 0

    return qualityFalls
      ? (items[idx] = {
          ...item,
          quality: 0,
          sellIn: item.sellIn <= 0 ? 0 : item.sellIn - 1,
        })
      : (items[idx] = {
          ...item,
          quality: item.quality - valueToDecrease,
          sellIn: item.sellIn <= 0 ? 0 : item.sellIn - 1,
        })
  }

  updateQuality() {
    this.items.forEach((item: Item, idx: number) => {
      const category = this.categorizeItem(item.name)
      switch (category) {
        case LEGENDARY:
          this.handleLegendary(item, idx)
          break
        case CONJURED:
          this.handleConjured(item, idx)
          break
        case CHEESE:
          this.handleCheese(item, idx)
          break
        case TICKET:
          this.handleTicket(item, idx)
          break
        default:
          this.handleNormal(item, idx)
          break
      }
    })

    return this.items
  }
}
