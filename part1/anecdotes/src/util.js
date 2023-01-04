const anecdotes = [
    { text: 'If it hurts, do it more often', vote: 0 },
    { text: 'Adding manpower to a late software project makes it later!', vote: 3 },
    { text: 'The first 90 percent of the code accounts for the first 90 percent of the development time... The remaining 10 percent of the code accounts for the other 90 percent of the development time.', vote: 4 },
    { text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', vote: 0 },
    { text: 'Premature optimization is the root of all evil.', vote: 9 }, { text: 'Debugging is twice as hard as writing the code in the first place', vote: 0 },
    { text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients', vote: 0 }
]


export const getAnecdoteWithMostVotes = (arr) => {
    const sortedArr = arr.sort((a, b) => b.vote > a.vote)
    return sortedArr[0]
}

