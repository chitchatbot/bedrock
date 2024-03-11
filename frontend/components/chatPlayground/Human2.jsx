"use client";

import ChatContainer from "@/components/chatPlayground/ChatComponent";

export default function Human2({text}) {
    return (
        <div className="col-start-3 col-end-13 p-3 rounded-lg">
            <div className="flex items-center justify-start flex-row-reverse">
                <div
                    className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                >
                    H
                </div>
                <div
                    className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                >
                    <div>{"대화내용을 전송했습니다. 잠시만 기다려주세요."}</div>
                </div>
            </div>
        </div>

    )
}