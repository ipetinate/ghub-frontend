import { GitHubUser } from "@/types/github";
import Image from "next/image";

type UserCardProps = {
    user: GitHubUser;
};

export function UserCard({ user }: UserCardProps) {
    return (
        <div className="flex flex-col border border-violet-300 p-10 rounded-md max-w-4xl mx-auto">
            <div className="flex flex-row gap-5">
                <div className="w-[200px] h-[200px]">
                    <div
                        style={{ backgroundImage: `url('${user.avatar_url}')` }}
                        className="rounded-md shadow-xl w-[200px] h-[200px] bg-cover bg-center"
                    />
                </div>

                <div className="flex flex-col gap-1 w-full">
                    <p className="text-3xl">{user.name}</p>

                    {user.bio ? (
                        <p className="text-xl my-3">{user.bio}</p>
                    ) : null}

                    {user.company ? (
                        <p className="text-sm">
                            Empresa:{" "}
                            <span className="text-violet-400">
                                {user.company}
                            </span>
                        </p>
                    ) : null}

                    <div className="w-full h-0 my-3 border-b border-slate-800"></div>

                    <p className="text-sm">
                        Usuário desde:{" "}
                        <span className="text-violet-400">
                            {new Date(user.created_at ?? "").toLocaleString(
                                "pt-BR"
                            )}
                        </span>
                    </p>

                    <div className="flex flex-row gap-3">
                        <p className="text-sm">
                            Seguidores:{" "}
                            <span className="text-violet-400">
                                {user.followers}
                            </span>
                        </p>
                        <p className="text-sm">
                            Seguindo:{" "}
                            <span className="text-violet-400">
                                {user.following}
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            <div className=""></div>
        </div>
    );
}
