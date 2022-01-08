import { useEffect, useState } from "react";
import professions from "../mockData/professions.json";
import users from "../mockData/users.json";
import qualities from "../mockData/qualities.json";
import request from "../services/http.service";

const STATUS = {
    IDLE: "not started",
    PENDING: "in process",
    SUCCESSED: "ready",
    ERROR: "error ocured"
};

function useMockData() {
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(STATUS.IDLE);
    const [progress, setProgress] = useState(0);
    const [count, setCount] = useState(0);
    const summaryCount = professions.length + users.length + qualities.length;

    const incrementCount = () => {
        setCount((prev) => prev + 1);
    };

    const updateProgress = () => {
        if (count !== 0 && status === STATUS.IDLE) {
            setStatus(STATUS.PENDING);
        }
        const newProgress = Math.floor((count / summaryCount) * 100);
        if (progress < newProgress) {
            setProgress(() => newProgress);
        }
        if (newProgress === 100) {
            setStatus(STATUS.SUCCESSED);
        }
    };

    useEffect(() => {
        updateProgress();
    }, [count]);

    async function initialize() {
        try {
            for (const prof of professions) {
                await request.put("profession/" + prof._id, prof);
                incrementCount();
            }
            for (const qual of qualities) {
                await request.put("quality/" + qual._id, qual);
                incrementCount();
            }
            for (const user of users) {
                await request.put("user/" + user._id, user);
                incrementCount();
            }
        } catch (error) {
            setError(error);
            setStatus(STATUS.ERROR);
        }
    }

    return { error, progress, status, initialize };
}

export default useMockData;
