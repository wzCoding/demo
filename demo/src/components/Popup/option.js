/**
 * popupOption对象，用于配置popup组件的选项。
 * @property {string} direction - popup显示的方向，默认值为 'top'，可取值为：'center','top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end','left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'。
 * @property {string} maxWidth - popup的最大宽度限制，默认值为 'auto'，可取值为：一个数字值、一个字符串值、'auto'
 * @property {string} placement - popup的放置部位（位于目标元素的外部或者内部），默认值为 'outside'，可取值为：'outside','inside'
 * @property {boolean} useCache - 是否使用样式缓存（使用缓存可以减少样式计算，提升性能）。
 * @property {boolean} needArrow - 是否需要箭头。
 * @property {number} arrowSize - 箭头尺寸。
 * @property {number} gap - popup与目标元素（触发元素）的间距。
 * @property {number[]} offset - popup与body边缘的间距，取值为 [x,y]，表示上下、左右距离边缘的间距，默认为 [10,10]。
 */

export const popupOption = {
    //方向
    direction: 'top',

    //最大宽度限制
    maxWidth: 'auto', 

    //popup的放置部位（位于目标元素的外部或者内部）
    placement: 'outside',
    
    //是否使用样式缓存（使用缓存可以减少样式计算，提升性能）
    useCache: false,

    //是否需要小箭头   
    needArrow: true, 

    //箭头尺寸
    arrowSize: 10,

    //popup与目标元素（触发元素）的间距
    gap: 5,  
    
    //popup与body边缘的间距
    offset: [10, 10] 

}

