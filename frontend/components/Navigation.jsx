import Link from "next/link";
export default function Navigation() {

    return (
        <div className="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto bg-gray-900 lg:translate-x-0 lg:static lg:inset-0">

            {/* 로그인 버튼 부분 */}
            <div className="flex flex-row items-center space-between mt-7">
                <img className="mx-2" alt="" src="/yong_icon.png" width={"60px"} height={"45px"}></img>
                <span className="text-orange" id="idToInsert" style={{ width: "90px" }}></span>
                <button className="mx-2 font-semibold text-white border border-white p-2" id="loginBtn" onclick="openLoginPopup()">
                    로그인
                </button>
            </div>
            <nav className="mt-10">
                <Link href="/"
                    className="flex items-center px-3 py-2 mt-4 text-gray-400 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100">
                    <span className="mx-1">Start New Chat</span>
                </Link>
            </nav>
        </div>
    );
}

