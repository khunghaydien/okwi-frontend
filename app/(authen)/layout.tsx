export default function AuthenLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative w-full min-h-screen">
            <img src="/images/authen-background.png" alt="authen background" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white p-10">
                    {children}
                </div>
            </div>
        </div>
    );
}