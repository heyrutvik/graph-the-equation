function fx(exp) {
    return {
        x: 0,
        atom: [],
        mkAtom: function() {
            this.atom = [];
            this.atom.push("(");
            var len = exp.length;
            for (var i = 0; i < len; i++) {
                var c = exp.charAt(i);
                if (isWhiteSpace(c)) {
                    continue;
                }
                if (isOperator(c)) {
                    if (c == 'x')
                        c = this.x;
                    if (c == '-') {
                        var sign = -1;
                        if (isDigit(exp.charAt(i+1))) {
                            var temp = '';
                            c = exp.charAt(++i);
                            while (isDigit(c)) {
                                temp += c;
                                c = exp.charAt(++i);
                            }
                            // extra increment in previous loop
                            c = temp;
                            c *= sign;
                        }
                    }
                    this.atom.push(c);
                    continue;
                }
                if (isDigit(c)) {
                    var temp = '';
                    while (isDigit(c)) {
                        temp += c;
                        c = exp.charAt(++i);
                    }
                    // extra increment in previous loop
                    i -= 1;
                    c = parseInt(temp);
                    this.atom.push(c);
                }
            }
            this.atom.push(")");
            return this.atom;
        },
        fx: function() {
            stk = stack();
            len = this.atom.length;
            console.log(JSON.stringify(this.atom));
            for (var i = 0; i < len; i++) {
                if (this.atom[i] != ')') {
                    stk.push(this.atom[i]);
                    continue;
                }
                if (isDigit(stk.get())) {
                    var r2 = stk.pop();
                    if (isOperator(stk.get())) {
                        var OP = stk.pop();
                        var r1 = stk.pop();
                        console.log(r1 + ' ' + OP + ' ' + r2);
                        switch(OP) {
                        case '+':
                            r2 = r1 + r2;
                            break;
                        case '-':
                            r2 = r1 - r2;
                            break;
                        case '*':
                            r2 = r1 * r2;
                            break;
                        case '/':
                            r2 = r1 / r2;
                            break;
                        case '^':
                            r2 = sqrt(r2, r1);
                            break;
                        }
                    }
                    stk.pop();
                    stk.push(r2);
                }
            }
            //console.log(JSON.stringify(stk));
            return stk.pop();
        }
    };
}

function stack() {
    return {
        top: -1,
        stack: [],
        push: function(c) {
            this.stack.push(c);
            this.top += 1;
        },
        pop: function() {
            if (this.top == -1) {
                msg('error', 'stack underflow');
                return false;
            }
            this.top -= 1;
            return this.stack.pop();
        },
        next: function() {
            return this.stack[this.top - 1];
        },
        get: function() {
            return this.stack[this.top];
        }
    };
}

function msg(msg, prop) {
    console.log(msg +': '+ prop);
}

function isOperator(c) {
    return "+-/*^x()".indexOf(c) >= 0;
}

function isWhiteSpace(c) {
    return " \t\n".indexOf(c) >= 0;
}

function isDigit(ch) {
    return /[0-9.]/i.test(ch);
}

function sqrt(x, b) {
    var temp = 1;
    for (var i = 0; i < x; i++) {
        temp *= b;
    }
    return temp;
}
