import scrapy
from scraper.items import BoatItem


class BoatsSpider(scrapy.Spider):
    rotate_user_agent = True
    name = "boats"
    # According to website, you can go 25, 50 or 100. Use 25 to avoid blocking your IP
    paginate = 25
    page = 1
    allowed_domains = ["sailboatdata.com"]
    start_urls = [
        'https://sailboatdata.com/sailboat?paginate={}&units=metric&sort=name&page={}'.format(paginate, page)
    ]

    def parse(self, response):
        boat_details_links = response.css('table.table-striped  a::attr(href)')
        yield from response.follow_all(boat_details_links, self.parse_boat)

        pagination_links = response.css('.pagination li.active + li a')
        yield from response.follow_all(pagination_links, self.parse)

    def parse_boat(self, response):
        def extract_with_xpath(query):
            return response.xpath(query).extract_first().strip()

        boat = BoatItem(
            boatModel=extract_with_xpath("//h1[2]/text()"),
            designer=extract_with_xpath('//article/section[2]/div[10]/div[2]/div[2]/a/text()'),
            hullType=extract_with_xpath('//article/section[2]/div[4]/div[1]/div[2]/text()'),
            riggingType=extract_with_xpath('//article/section[2]/div[4]/div[1]/div[4]/text()'),
            displacement=extract_with_xpath('//article/section[2]/div[4]/div[5]/div[2]/text()'),
            loa=extract_with_xpath('//article/section[2]/div[4]/div[2]/div[2]/text()'),
            lwl=extract_with_xpath('//article/section[2]/div[4]/div[2]/div[4]/text()'),
            beam=extract_with_xpath('//article/section[2]/div[4]/div[3]/div[2]/text()'),
            draft=extract_with_xpath('//article/section[2]/div[4]/div[4]/div[2]/text()'),
            images=response.css(".sailboat-images.row img").xpath('@src').getall(),
        )
        yield boat
