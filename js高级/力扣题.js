var wordBreak = function(s, wordDict) {
    /*
        dp[j]表示0-j的字符子串可以被拆
    */
    let dp = new Array(s.length+1).fill(false)
    dp[0] = true
    for(let i = 1; i<=s.length; i++){
        for(let j = 0; j<wordDict.length; j++){
            if(wordDict[j].length<=i){
                if(wordDict.indexOf(s.substring(i-wordDict[j].length, i))>-1&&!dp[i]){
                    dp[i] = dp[i-wordDict[j].length]
                    console.log(dp[i]+' '+i+j)
                }
            }
        }
    }
    console.log(dp)
    return dp[s.length]
};
let s = "dogs"
let wordDict = ["dog","s","gs"]
console.log(wordBreak(s, wordDict))