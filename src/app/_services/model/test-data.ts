import { InMemoryDbService } from 'angular-in-memory-web-api';

export class TestData implements InMemoryDbService {
  createDb() {
    let articleDetails = [
      {
        id: 101,
        ItemName: 'FrameWork',
        ItemImage: 'Image1',
        Itemprice: '2000',
        Itemdescription: 'Angular',
        ItemadditionDate: '05-07-2020',
      },
    ];
    return { articles: articleDetails };
  }
}
