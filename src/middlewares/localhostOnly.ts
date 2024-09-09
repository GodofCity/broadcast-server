import os from "os";
import type { Request, Response, NextFunction } from "express";

const getLocalIP = () => {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]!) {
            if (iface.family === "IPv4" && !iface.internal) {
                return iface.address;
            }
        }
    }
    return "127.0.0.1"; // Ha nem talál külső IP-t, visszatér a localhosttal
};

export const localhostOnly = (req: Request, res: Response,next: NextFunction) => {
    const clientIp = req.ip === "::1" ? "127.0.0.1" : req.ip; // IPv6 localhost kezelése
    if (clientIp === "127.0.0.1" || clientIp === getLocalIP()) {
        next();
    } else {
        res.status(403).send("Access denied. Only localhost or server IP can access this resource.");
    }
};
