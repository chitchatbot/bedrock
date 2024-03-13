"use client";

import Human from "@/components/chatPlayground/Human";
import Human2 from "@/components/chatPlayground/Human2";
import React, { useRef, useState, useEffect } from "react";
import Assistant from "@/components/chatPlayground/Assistant";
import Loader from "@/components/chatPlayground/Loader";
import GlobalConfig from "@/app/app.config";
import ModelIndicator from "@/components/chatPlayground/ModelIndicator";

export default function ChatContainer() {
    const [conversation, setConversation] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const endpoint = "/foundation-models/model/chat/anthropic.claude-v2/invoke";
    const api = `${GlobalConfig.apiHost}:${GlobalConfig.apiPort}${endpoint}`;

    const scrollRef = useRef();

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [conversation]);


    // (start) 파일 입력에 대한 참조 생성
    const fileInputRef = useRef(null);

    // 파일 제출 처리
    const handleSubmit = async (event) => {
        event.preventDefault(); // 폼의 기본 제출 동작 방지

        if (!fileInputRef.current.files.length) {
            console.log("파일을 선택해주세요.");
            return;
        }

        const file = fileInputRef.current.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const fileContent = e.target.result;
            sendFileContent(fileContent)
        };

        reader.readAsText(file); // 파일을 텍스트로 읽기
    };
    //(end)

    const sendFileContent = async (fileContent) => {
        const newMessage = { sender: "Human2", message: fileContent };
        setConversation(prevConversation => [...prevConversation, newMessage]);
        setInputValue('');

        try {
            const message = "나는 앞으로 이 채팅대화 내용에 대해 너에게 질문할거야. 채팅대화 내용: " + fileContent
            //extractPrompt([...conversation, newMessage]);
            setIsLoading(true);

            const response = await fetch(api, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: message })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const setAnswer = "채팅대화 파일을 받았습니다. 제가 대화 내용을 이해했으니 질문 해주세요.."
            await response.json().then(data => {
                setConversation(prevConversation => [...prevConversation, {
                    sender: "Assistant",
                    message: setAnswer //data.completion
                }]);
            });

        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const extractPrompt = (body) => {
        let conversationBuilder = '';
        for (const message of body) {
            conversationBuilder += `${message.sender}: ${message.message}\n\n`;
        }

        return conversationBuilder.trim();
    }

    const sendMessage = async () => {
        const newMessage = { sender: "Human", message: inputValue };
        setConversation(prevConversation => [...prevConversation, newMessage]);
        setInputValue('');

        try {
            const message = extractPrompt([...conversation, newMessage]);

            setIsLoading(true);

            const response = await fetch(api, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: message })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            await response.json().then(data => {
                setConversation(prevConversation => [...prevConversation, {
                    sender: "Assistant",
                    message: data.completion
                }]);
            });

        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // 기본 질문 클릭했을 때 답변 출력하기(insertData1,insertData2)
    const insertData1 = () => {
        setConversation(prevConversation => [
            ...prevConversation,
            {
                sender: "Assistant",
                message: <div>ChitChatBot은 카카오톡 채팅 대화내역에 AI 서비스를 탑재하여<br />
                    질의응답을 통해 필요한 정보를 손쉽게 찾을 수 있는 서비스입니다.</div>
            }
        ]);
    };

    const insertData2 = () => {
        setConversation(prevConversation => [
            ...prevConversation,
            {
                sender: "Assistant",
                message: <div> 질의응답을 하고 싶은 카카오톡 채팅방에 접속 후 "대화 내보내기" 기능을 통해 파일을 다운받고<br />
                    <span className="font-semibold">"채팅방 텍스트 파일 넣기"</span> 버튼을 눌러 파일을 첨부해주세요.</div>
            }
        ]);
    };

    const insertData3 = () => {
        setConversation(prevConversation => [
            ...prevConversation,
            {
                sender: "Assistant",
                message: <div className="relative ml-3 text-sm bg-white py-2 px-2 shadow rounded-xl rounded-br-xl">
                    <form onSubmit={handleSubmit} className="fileForm" encType="multipart/form-data">
                        <input type="file" className="textfileInput" id="textfile" name="textfile" accept=".txt" ref={fileInputRef} />
                        <button className="submitBtn" type="submit">전송</button>
                    </form>
                </div>
            }
        ]);
    };


    // Q&A 버튼 눌렀을 때 뜨는 메뉴
    const toggleMenu = () => {
        setConversation(prevConversation => [
            ...prevConversation,
            {
                sender: "Assistant",
                message: <div>
                    <button className="inform-message rounded-xl bg-gray-200 px-4" onClick={insertData1}>
                        ChitChatBot은 어떤 서비스야?
                    </button>
                    <button className="inform-message rounded-xl bg-gray-200 px-4" onClick={insertData2}>
                        대화내용 추가는 어떻게 하는거야?
                    </button>
                    <button className="inform-message rounded-xl bg-mint px-4 font-semibold" onClick={insertData3}>
                        채팅방 텍스트 파일 넣기
                    </button>
                </div>

            }
        ]);
    };



    return <div className="flex flex-col flex-auto h-full p-6">
        <h3 className="text-3xl font-medium text-gray-700">ChitChatBot</h3>
        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 p-4 mt-8">
            {/* <ModelIndicator modelName="Anthropic Claude 2" /> */}
            <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full">
                    <div className="col-start-1 col-end-11 p-3 rounded-lg">
                        <div className="flex flex-row items-center mb-4">
                            <div
                                className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                            >
                                <img alt="" src="/yong_icon.png" width={"38px"} height={"35px"}></img>
                            </div>
                            <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl rounded-br-xl">
                                안녕하세요 ChitChatBot입니다. 처음 서비스를 이용하신다면 다음 질문들을 눌러 사용법을 알아보세요.
                            </div>
                        </div>
                        <div className="flex flex-row items-center mb-4">
                            <div
                                className="flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0"
                            >
                            </div>
                            <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl rounded-br-xl">
                                <button className="inform-message rounded-xl bg-gray-200 px-4" onClick={insertData1}>
                                    ChitChatBot은 어떤 서비스야?
                                </button>
                                <button className="inform-message rounded-xl bg-gray-200 px-4" onClick={insertData2}>
                                    대화내용 추가는 어떻게 하는거야?
                                </button>
                                <button className="inform-message rounded-xl bg-mint px-4 font-semibold" onClick={insertData3}>
                                    채팅방 텍스트 파일 넣기
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-12 gap-y-2">
                        {conversation.map((item, i) => {
                            if (item.sender === "Assistant") {
                                return <Assistant text={item.message} key={i} />;
                            } else if (item.sender === "Human") {
                                return <Human text={item.message} key={i} />;
                            } else if (item.sender === "Human2") {
                                return <Human2 text={item.message} key={i} />;
                            } else {
                                // 조건에 해당하지 않는 경우는 렌더링하지 않음
                                return null;
                            }
                        })}
                        {isLoading ? (<Loader />) : (<div></div>)}
                        <div ref={scrollRef} />
                    </div>
                </div>
            </div>

            {/* 채팅보내는 창 전체 */}
            <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                <div className="flex-grow">
                    <div className="relative w-99">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    sendMessage();
                                }
                            }}
                            placeholder="Send a message"
                            className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                        />
                    </div>
                </div>

                {/* Q&A 버튼 */}
                <div classname="m1-4">
                    <button type="button" onClick={toggleMenu} className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                    >
                        <span>Q&A</span>
                    </button>
                </div>
                {/* 메세지 전송 버튼 */}
                <div className="ml-2">
                    <button
                        type="button"
                        onClick={sendMessage}
                        className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                    >
                        <span>Send</span>
                        <span className="ml-2">
                            <svg
                                className="w-4 h-4 transform rotate-45 -mt-px"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                ></path>
                            </svg>
                        </span>
                    </button>
                </div>

            </div>
        </div>
    </div>;
}
