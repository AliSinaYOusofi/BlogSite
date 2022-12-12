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
            <div className="w-[70%] flex items-start justify-center ml-8 bg-[#F5F5F5] p-4 rounded-lg">
                <TextLoading />
            </div>
            <div className="w-[25%] relative flex flex-col px-2 py-4 items-center justify-center ml-2 ">
                <ColumnCardLoading />
                <SingleLoading />
                <SingleLoading />
                <SingleLoading />
                <SingleLoading />
                <SingleLoading />
            </div>
        </div>
    );
}
