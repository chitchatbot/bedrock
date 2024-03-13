"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Navigation() {
    const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isChatroomPopupOpen, setIsChatroomPopupOpen] = useState(false); // 네모창 상태 추가
    const [chatroomName, setChatroomName] = useState(""); // 채팅방 이름 상태 추가
    const [chatrooms, setChatrooms] = useState([]); // 채팅방 목록 상태 추가

    const openLoginPopup = () => {
        setIsLoginPopupOpen(true);
    };

    const closeLoginPopup = () => {
        setIsLoginPopupOpen(false);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        if (username.trim() === "" || password.trim() === "") {
            alert("ID와 비밀번호를 입력해주세요.");
            return;
        }

        setIsLoggedIn(true);
        setIsLoginPopupOpen(false);
    };

    const openAddChatroom = () => {
        setIsChatroomPopupOpen(true);
    };

    const closeAddChatroom = () => {
        setIsChatroomPopupOpen(false);
    };

    const handleAddChatroom = (e) => {
        e.preventDefault();
        // 입력된 채팅방 이름을 설정
        const newChatroomName = e.target.elements.chatroomName.value;
        setChatroomName(newChatroomName);
        setIsChatroomPopupOpen(false); // 네모창을 닫도록 상태 변경

        // 채팅방 목록에 새로운 채팅방 추가
        setChatrooms([...chatrooms, newChatroomName]);
    };

    return (
        <div className="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto bg-gray-900 lg:translate-x-0 lg:static lg:inset-0">
            <div className="flex flex-row items-center space-between mt-7">
                <img className="mx-2" alt="" src="/yong_icon.png" width={"60px"} height={"45px"} />
                <span className="text-orange" id="idToInsert" style={{ width: "75px" }}>{isLoggedIn ? username : ""}</span>
                <button className="mx-2 font-semibold text-white border border-white p-2" onClick={isLoggedIn ? () => setIsLoggedIn(false) : openLoginPopup}>
                    {isLoggedIn ? "로그아웃" : "로그인"}
                </button>
            </div>
            <div className="flex flex-row items-center mt-7">
                <div className="mr-auto pl-4 text-white">채팅방 목록</div>
                <button className="ml-auto pr-4" onClick={openAddChatroom}>
                    <img alt="" src="/plus_icon.png" width={"30px"} height={"25px"} />
                </button>
            </div>

            {/* 채팅방 목록 표시 */}
            {chatrooms.map((chatroom, index) => (
                <nav key={index} className="mt-2 border border-white rounded-md mx-1">
                    <Link href="/">
                        <span className="flex items-center px-3 py-2 text-gray-400 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100">
                            <span className="font-semibold mx-1">{chatroom}</span>
                        </span>
                    </Link>
                </nav>
            ))}

            {isLoginPopupOpen && (
                <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-lg font-semibold mb-4">로그인</h2>
                        <form onSubmit={handleLogin}>
                            <div className="mb-4">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">아이디</label>
                                <input type="text" id="username" className="mt-1 p-2 border border-gray-300 rounded-md w-full" onChange={handleUsernameChange} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">비밀번호</label>
                                <input type="password" id="password" className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                            </div>
                            <div className="flex justify-end">
                                <button type="button" className="px-4 py-2 mr-2 bg-gray-200 text-gray-800 rounded-md" onClick={closeAddChatroom}>취소</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">로그인</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isChatroomPopupOpen && (
                <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-lg font-semibold mb-4">채팅방 추가</h2>
                        <form onSubmit={handleAddChatroom}>
                            <div className="mb-4">
                                <label htmlFor="chatroomName" className="block text-sm font-medium text-gray-700">채팅방 이름</label>
                                <input type="text" id="chatroomName" name="chatroomName" className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                            </div>
                            <div className="flex justify-end">
                                <button type="button" className="px-4 py-2 mr-2 bg-gray-200 text-gray-800 rounded-md" onClick={closeLoginPopup}>취소</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">추가</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
