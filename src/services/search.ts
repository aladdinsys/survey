import { NextApiRequest, NextApiResponse } from 'next';
import esClient from '../../utils/elasticsearch';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        esClient.put()
        const { body } = await esClient.update({
            index: 'surveys',
            body: {
                doc: updatedData,
            },
        });

        res.status(200).json(body);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}