import { Client } from '@elastic/elasticsearch';

const esClient = new Client({ node: 'http://192.168.0.252:9200' });

export default esClient;