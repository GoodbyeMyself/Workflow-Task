/**
 * 增强版错误过滤器 - 过滤控制台中的特定警告信息
 * @author: M.yunlong
 * @date: 2024-12-19
 */

// 需要过滤的错误信息模式
const FILTERED_ERROR_PATTERNS = [
    // findDOMNode 相关警告
    /findDOMNode is deprecated and will be removed in the next major release\. Instead, add a ref directly to the element you want to reference\./,
    /Warning: findDOMNode is deprecated/,
    
    // React 其他常见警告
    /Warning: componentWillReceiveProps has been renamed/,
    /Warning: componentWillUpdate has been renamed/,
    /Warning: componentWillMount has been renamed/,
    
    // Ant Design 相关警告
    /Warning: .* is deprecated in antd/,
    
    // 其他常见的开发环境警告
    /Warning: ReactDOM\.findDOMNode is deprecated/,
];

// 原始的控制台方法
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;
const originalConsoleLog = console.log;

// 是否启用过滤器
let isFilterActive = false;

/**
 * 检查错误信息是否应该被过滤
 * @param message 错误信息
 * @returns 是否应该被过滤
 */
function shouldFilterError(message: string): boolean {
    return FILTERED_ERROR_PATTERNS.some(pattern => pattern.test(message));
}

/**
 * 过滤后的 console.warn 方法
 */
function filteredConsoleWarn(...args: any[]): void {
    const message = args.join(' ');
    if (!shouldFilterError(message)) {
        originalConsoleWarn.apply(console, args);
    } else if (process.env.NODE_ENV === 'development') {
        // 在开发环境下，可以选择性地记录被过滤的警告
        // originalConsoleLog('🔇 已过滤警告:', message);
    }
}

/**
 * 过滤后的 console.error 方法
 */
function filteredConsoleError(...args: any[]): void {
    const message = args.join(' ');
    if (!shouldFilterError(message)) {
        originalConsoleError.apply(console, args);
    } else if (process.env.NODE_ENV === 'development') {
        // 在开发环境下，可以选择性地记录被过滤的错误
        // originalConsoleLog('🔇 已过滤错误:', message);
    }
}

/**
 * 启用错误过滤器
 */
export function enableErrorFilter(): void {
    if (isFilterActive) {
        return; // 避免重复启用
    }
    
    // 替换控制台方法
    console.warn = filteredConsoleWarn;
    console.error = filteredConsoleError;
    
    isFilterActive = true;
    
    // 在开发环境下输出提示信息
    if (process.env.NODE_ENV === 'development') {
        originalConsoleWarn('🔇 增强版错误过滤器已启用');
        originalConsoleWarn('📋 已配置过滤模式数量:', FILTERED_ERROR_PATTERNS.length);
    }
}

/**
 * 禁用错误过滤器（恢复原始控制台方法）
 */
export function disableErrorFilter(): void {
    if (!isFilterActive) {
        return; // 避免重复禁用
    }
    
    console.warn = originalConsoleWarn;
    console.error = originalConsoleError;
    
    isFilterActive = false;
    
    if (process.env.NODE_ENV === 'development') {
        originalConsoleWarn('🔊 错误过滤器已禁用');
    }
}

/**
 * 添加自定义过滤模式
 * @param pattern 正则表达式模式
 */
export function addFilterPattern(pattern: RegExp): void {
    if (!FILTERED_ERROR_PATTERNS.includes(pattern)) {
        FILTERED_ERROR_PATTERNS.push(pattern);
        if (process.env.NODE_ENV === 'development') {
            originalConsoleLog('✅ 已添加过滤模式:', pattern);
        }
    }
}

/**
 * 移除过滤模式
 * @param pattern 要移除的正则表达式模式
 */
export function removeFilterPattern(pattern: RegExp): void {
    const index = FILTERED_ERROR_PATTERNS.indexOf(pattern);
    if (index > -1) {
        FILTERED_ERROR_PATTERNS.splice(index, 1);
        if (process.env.NODE_ENV === 'development') {
            originalConsoleLog('❌ 已移除过滤模式:', pattern);
        }
    }
}

/**
 * 获取当前所有过滤模式
 * @returns 过滤模式数组
 */
export function getFilterPatterns(): RegExp[] {
    return [...FILTERED_ERROR_PATTERNS];
}

/**
 * 检查过滤器是否已启用
 * @returns 是否已启用
 */
export function isFilterEnabled(): boolean {
    return isFilterActive;
}

/**
 * 清空所有过滤模式
 */
export function clearFilterPatterns(): void {
    FILTERED_ERROR_PATTERNS.length = 0;
    if (process.env.NODE_ENV === 'development') {
        originalConsoleLog('🗑️ 已清空所有过滤模式');
    }
}

/**
 * 获取过滤器统计信息
 * @returns 统计信息对象
 */
export function getFilterStats(): {
    enabled: boolean;
    patternCount: number;
    patterns: RegExp[];
} {
    return {
        enabled: isFilterActive,
        patternCount: FILTERED_ERROR_PATTERNS.length,
        patterns: getFilterPatterns(),
    };
} 