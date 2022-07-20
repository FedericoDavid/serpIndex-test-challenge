import axios from 'axios';
import { Index, PostIndex } from './indexTypes';

type IndexAPIClient = {
    get: () => Promise<Array<Index>>;
    post: (newIndex: PostIndex) => Promise<PostIndex>;
};

export const useIndexAPIClient = (): IndexAPIClient => {
    const url = "https://serpindex-demo.svc.violetvault.com/api/Index";

    const get = async (): Promise<Array<Index>> => {
        const res = await axios.get(url);
        return res.data;
    };

    const post = async (newIndex: PostIndex): Promise<PostIndex> => await axios.post(url, newIndex);

    return { get, post };
};