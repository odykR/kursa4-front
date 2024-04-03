import React, {useEffect, useState} from 'react';
import {LoginJWTResponse} from "../login/types/login.interfaces";
import {usePathname, useRouter} from "next/navigation";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

export const CheckJWT = () => {
    const path = usePathname()
    const [isAdmin, setIsAdmin] = useState<boolean>(false)
    const [isAuthCompleted, setIsAuthCompleted] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const getUserRole = () => {
        setIsLoading(true)
        const cookies = Cookies.get("Cookie")
        if (!cookies) {
            setIsAdmin(false)
            setIsAuthCompleted(false)
            return
        }
        const decodedCookie: LoginJWTResponse = jwtDecode(cookies)
        if (decodedCookie.role === "admin") {
            setIsAdmin(true)
            setIsAuthCompleted(true)
            return
        }
        if (decodedCookie.role === "user") {
            setIsAdmin(false)
            setIsAuthCompleted(true)
            return
        }
        setIsAdmin(false)
        setIsAuthCompleted(false)
        setIsLoading(false)
    }
    useEffect(() => {
        getUserRole()
    }, [path]);
    return {path, isAdmin, isAuthCompleted, isLoading}
};

export const CheckJWTWithRedirect = () => {
    const router = useRouter()
    const path = usePathname()
    const [isAdmin, setIsAdmin] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const getUserRole = () => {
        setIsLoading(true)
        const cookies = Cookies.get("Cookie")
        if (!cookies) {
            router.push('/')
            setIsAdmin(false)
            return
        }
        const decodedCookie: LoginJWTResponse = jwtDecode(cookies)
        if (decodedCookie.role !== "admin") {
            router.push('/')
            setIsAdmin(false)
            return
        }
        setIsAdmin(true)
        setIsLoading(false)
    }
    useEffect(() => {
        getUserRole()
    }, [path]);
    return {path, isAdmin, isLoading}
};