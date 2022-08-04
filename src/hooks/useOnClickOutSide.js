import React, { useEffect } from 'react'

const useOnClickOutSide = (ref, handler) => {
    useEffect(() => {
        const listener = (event) => {
            // 콘솔로 내부 확인 (현재 객체가 있는지 확인)
            console.log(ref.current);
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };
        // 컴포넌트 사용시 이벤트 리스너 사용
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        // 컴포넌트 종료시 이벤트 리스너 제거
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler])
    
}
export default useOnClickOutSide;