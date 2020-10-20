import { expect } from 'chai'
import { TickitShop } from '../app/tickit-shop'
import { DEFAULT_TEST_CASE, TEST_CASE } from './test-case'

describe('TickitShop', () => {
  const items = new TickitShop(TEST_CASE).updateQuality()

  describe('Legendary Items', () => {
    it('should set sellIn to 0 from -9 and quality to 80 from 22222', () => {
      expect(items[0].sellIn).to.equal(0)
      expect(items[0].quality).to.equal(80)
    })

    it('should set quality to 80 from -4580', () => {
      expect(items[1].quality).to.equal(80)
    })
  })

  describe('Conjured Items', () => {
    it('should decrease quality to 0 from 2, and sellIn to 17 from 18', () => {
      expect(items[2].sellIn).to.equal(DEFAULT_TEST_CASE[2].sellIn - 1)
      expect(items[2].quality).to.equal(DEFAULT_TEST_CASE[2].quality - 2)
    })

    it('should set quality to 0 from -48', () => {
      expect(items[3].quality).to.equal(0)
    })
  })

  describe('Sharp Cheddars', () => {
    it('should remain the quality to 50', () => {
      expect(items[4].quality).to.equal(50)
    })

    it('should increase the quality to 50 from 49', () => {
      expect(items[5].quality).to.equal(50)
    })

    it('should update the quality to 0 from -8000', () => {
      expect(items[6].quality).to.equal(0)
    })
  })

  describe('Lady Gaga Tickets', () => {
    it('should increase the quality by 1 since sell in has more than 10 days', () => {
      expect(items[7].quality).to.equal(DEFAULT_TEST_CASE[7].quality + 1)
    })

    it('should decrease the quality to 0 since sell in reached 0', () => {
      expect(items[8].quality).to.equal(0)
    })

    it('should increase the quality by 2 since sell in has less than 10 days but bigger than 5 days', () => {
      expect(items[9].quality).to.equal(DEFAULT_TEST_CASE[9].quality + 2)
    })

    it('should increase the quality by 3 since sell in has more than 5 days', () => {
      expect(items[10].quality).to.equal(DEFAULT_TEST_CASE[10].quality + 3)
    })
  })

  describe('Normal Items', () => {
    it('should set sellIn to 0 from -1, decrease quality to 497 from 499', () => {
      expect(items[11].sellIn).to.equal(0)
      expect(items[11].quality).to.equal(DEFAULT_TEST_CASE[11].quality - 2)
    })

    it('should decrease sellIn to 3999 from 4000, quality remains 0', () => {
      expect(items[12].quality).to.equal(0)
      expect(items[12].sellIn).to.equal(DEFAULT_TEST_CASE[12].sellIn - 1)
    })
  })
})
