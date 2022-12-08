import React from 'react'
import CardLoading from '../../components/SinglePostLoading/CardLoading';
import ColumnCardLoading from '../../components/SinglePostLoading/ColumnCardLoading';
import PostCardLoading from '../../components/SinglePostLoading/PostCardLoading';
import PostIneractionLoading from '../../components/SinglePostLoading/PostInteractionLoading';
import SingleLoading from '../../components/SinglePostLoading/SingleLoading';
import TextLoading from '../../components/SinglePostLoading/TextLoading';

export default function Loading() {
    return (
        <div className="w-[100%] mx-auto  mt-10 py-4 flex flex-row justify-center relative">
            
            <div className="w-[5%]">
                <PostIneractionLoading />
            </div>
            <div className="w-[70%] flex flex-col gap-y-10">
                <CardLoading />
                <TextLoading />
                <TextLoading />
            </div>
            <div className="w-[25%] relative shadow-sm mr-3 rounded-lg h-fit shadow-current">
                <ColumnCardLoading />
                <SingleLoading />
                <SingleLoading />
                <SingleLoading />
            </div>
        </div>
    );
}
