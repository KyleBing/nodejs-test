const strOrigin = `17611288559 kylebing@163.com AirPods Pro 3.4 gsx喜欢剪视频的，最近也已经积压了好几条视频，GSX250 介绍，GoPro 相关配置介绍。但好像一直不想开始，不想做，只想闲着。精神低迷。
上个周末去长清园博园转了下，跟妹妹，骑摩托车带她转了转。后来去园里租船转了下，这还是我第一次坐船，1小时￥100，押金￥100，坐了会船。`


function splitSentence(setence){
    if (setence.length === 0){
        return []
    } else {
        let parts = []

        let lastChar = '' // 最后一个字符
        let tempPhrase = '' // 临时词组

        for (let i = 0; i < setence.length; i++) {
            let currentChar = setence[i]

            // 是同一个类别时
            if (isCombination(currentChar, lastChar)){
                tempPhrase = tempPhrase.concat(currentChar)
                lastChar = currentChar
            }
            // 不是同一个类别时
            else {
                if (tempPhrase.length === 0){
                    tempPhrase = currentChar
                } else {
                    parts.push(tempPhrase)
                    tempPhrase =  currentChar
                }
                lastChar = currentChar
            }
        }

        // 补充最后一个临时词组
        if (tempPhrase.length > 0){
            parts.push(tempPhrase)
        }

        return parts
    }
}

/**
 * 判断前后两个字符是否为一个组合
 * @param newChar 新字符
 * @param oldChar 旧字符
 * @returns {boolean}
 */
function isCombination(newChar, oldChar){
    const arraySymbol = `'"，。“”‘’`.split('')
    // 如果是标点，必为 false
    if (arraySymbol.includes(newChar) || arraySymbol.includes(oldChar)){
        return false
    } else {
        return /[0-9\.]/.test(newChar) && /[0-9\.]/.test(oldChar)  // 数字
            || /[￥\$0-9\.]/.test(newChar) && /[￥\$0-9\.]/.test(oldChar)  // 数字
            || /[0-9a-zA-Z\-@]/.test(newChar) && /[0-9a-zA-Z\-@]/.test(oldChar) // 普通数字英文词组
            || /[\u4E00-\u9FA5]/.test(newChar) && /[\u4E00-\u9FA5]/.test(oldChar) // 汉字
    }
}

console.log('String Origin: ', strOrigin.length)
const finalArray = splitSentence(strOrigin)
console.log('Phrase Count: ', finalArray.length)
console.log('Result: ', finalArray.toString())
