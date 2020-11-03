# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class BoatItem(scrapy.Item):
    boatModel = scrapy.Field()
    designer = scrapy.Field()
    hullType = scrapy.Field()
    riggingType = scrapy.Field()
    displacement = scrapy.Field()
    loa = scrapy.Field()
    lwl = scrapy.Field()
    beam = scrapy.Field()
    draft = scrapy.Field()

    # This is an array of images urls
    images = scrapy.Field()
