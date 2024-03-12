"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Navigation() {
    const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
    const [username, setUsername] = useState(""); // 사용자 이름 상태 추가
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 상태 추가

    const openLoginPopup = () => {
        setIsLoginPopupOpen(true);
    };

    const closeLoginPopup = () => {
        setIsLoginPopupOpen(false);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value); // 입력된 사용자 이름을 상태에 업데이트
    };

    const handleLogin = (e) => {
        e.preventDefault(); // 기본 제출 동작 방지

        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        
        // 입력된 값이 비어있는지 확인
        if (username.trim() === "" || password.trim() === "") {
            alert("ID와 비밀번호를 입력해주세요.");
            return;
        }
        
        // 로그인 성공 시 로그인 상태 업데이트
        setIsLoggedIn(true);

        // 로그인 성공시 setIsLoginPopupOpen(false) 호출
        setIsLoginPopupOpen(false);
    };

    return (
        <div className="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto bg-gray-900 lg:translate-x-0 lg:static lg:inset-0">
            {isLoginPopupOpen && (
                <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-lg font-semibold mb-4">로그인</h2>
                        <form onSubmit={handleLogin} >
                            <div className="mb-4">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">아이디</label>
                                <input type="text" id="username" className="mt-1 p-2 border border-gray-300 rounded-md w-full" onChange={handleUsernameChange} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">비밀번호</label>
                                <input type="password" id="password" className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                            </div>
                            <div className="flex justify-end">
                                <button type="button" className="px-4 py-2 mr-2 bg-gray-200 text-gray-800 rounded-md" onClick={closeLoginPopup}>취소</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">로그인</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="flex flex-row items-center space-between mt-7">
                <img className="mx-2" alt="" src="/yong_icon.png" width={"60px"} height={"45px"} />
                <span className="text-orange" id="idToInsert" style={{ width: "75px" }}>{isLoggedIn ? username : ""}</span> {/* 사용자 이름 표시 */}
                <button className="mx-2 font-semibold text-white border border-white p-2" onClick={isLoggedIn ? () => setIsLoggedIn(false) : openLoginPopup}>
                    {isLoggedIn ? "로그아웃" : "로그인"}
                </button>
            </div>
            <nav className="mt-10">
                <Link href="/" className="flex items-center px-3 py-2 mt-4 text-gray-400 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100">
                    <span className="mx-1">Start New Chat</span>
                </Link>
            </nav>
        </div>
    );
}
