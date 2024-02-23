"use client";

import { useEffect, useState } from "react";

export default function Register() {
    const [isRegistered, setIsRegistered] = useState<boolean>(false);
    const [statusMsg, setStatusMsg] = useState<string>("");

    useEffect(() => {
        if (!('serviceWorker' in navigator)) {
            return setStatusMsg("Service Workers unavailable");
        }
        if (!('PushManager' in window)) {
            return setStatusMsg("Push Notifications unavailable");
        }
        
        async function requestNotifications() {
            try {
                if (Notification.permission !== 'granted') {
                    const request = await window.Notification.requestPermission();
                    if (request !== 'granted') {
                        throw new Error("Notification permission denied.");
                    }
                }
            } catch (err) {
                setStatusMsg("Error getting notification permission. Please allow push notifications to work.");
                throw err;
            }
        }

        async function registerServiceWorker() {
            try {
                await navigator.serviceWorker.register('/service-worker.js');
            } catch (err) {
                setStatusMsg("Error registering service worker. Check console for more details.");
                throw err;
            }
        }

        async function main() {
            try {
                await requestNotifications();
                await registerServiceWorker();

                setStatusMsg("Registered for push notifications successfully.");
                setIsRegistered(true);
            } catch (err) {
                console.error(err);
            }
        }

        main();
    }, []);

    return (
        <div role="alert" className={`alert ${ isRegistered && 'alert-success' }`}>
            { statusMsg }
        </div>
    );
}