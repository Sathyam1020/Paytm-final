import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import {Card} from "@repo/ui/card";

async function getTransactionHistory() {
    const session = await getServerSession(authOptions);
    console.log(session.user);

    const transactions = await prisma.p2pTransfer.findMany({
        where: {
            OR: [
                { fromUserId: Number(session.user.id) },
                { toUserId: Number(session.user.id) }
            ]
        },
        include: {
            fromUser: true,
            toUser: true
        },
        orderBy: {
            timestamp: 'desc'
        }
    });

    return transactions
}

export default async function() {

    const transactions = await getTransactionHistory();
    const session = await getServerSession(authOptions);

    return (
        <div className="w-screen">
            <div className="text-4xl text-[#1f2937] pt-8 mb-8 font-bold">
                Transaction History
            </div>
            <Card title={'Recent Transactions'}>
                {
                    transactions.map((transaction) => (
                        <div className='flex justify-between bg-slate-100 p-2 m-2 rounded-md shadow-sm'>
                            {
                                transaction.fromUserId === Number(session?.user?.id) ? (
                                    <div>
                                        <div className='font-semibold'>{transaction.toUser.number}</div>
                                        <div className='text-sm'>{transaction.timestamp.toLocaleString()}</div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className='font-semibold'>{transaction.fromUser.number}</div>
                                        <div className='text-sm'>{transaction.timestamp.toLocaleString()}</div>
                                    </div>
                                )
                            }
                            <div>
                                <div
                                    className={`${transaction.fromUserId === Number(session.user.id) ? 'text-black' : 'text-green-500'} font-semibold`}>
                                    {transaction.fromUserId === Number(session?.user?.id) ? `${transaction.amount/100}` : `+${transaction.amount/100}`}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </Card>
        </div>
    );
}

