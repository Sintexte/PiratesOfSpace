function normalize(val, min, max){
    return Math.max(0, Math.min(1, val-min / max-min))
}