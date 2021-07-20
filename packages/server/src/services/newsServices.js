/* eslint-disable class-methods-use-this */
import News from '../models/news';

class NewsServices {
  formatNews(news, select) {
    switch(select){
      case 'all':
        return {
          ...news, 
          creator: {
            image: news.creator.image,
            name: news.creator.name,
            id: news.creator._id,
          },
          updateAt: undefined,
          __v: undefined,
        }
      default:
        return {...news, __v: undefined };
    }
  }

  async findAll(params, select = 'all') {
    const news = await News.find(params)
      .sort({ createdAt: -1 })
      .populate('creator');
    return news.map(({ _doc: newz }) => this.formatNews(newz, select));
  }

  async findOne(params, select) {
    const { _doc: news } = await News.findOne(params);
    return this.formatNews(news, select);
  }

  async create(params) {
    const { _doc: news } = await News.create(params);
    return this.formatNews(news);
  }

  async update(where, params) {
    const { _doc: news } = await News.findOneAndUpdate(
      where, 
      params,
      {
        new: true,
        runValidators: true,
      });
    return this.formatNews(news);
  }

  async delete(params) {
    const news = await News.findOneAndDelete(params);
    return this.formatNews(news);
  }
}

const newsServices = new NewsServices;

export default newsServices;
