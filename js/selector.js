function Selector() {

}

function SelectorList() {  // 目标选择器变量
    list.innerHTML = `
        <!--目标选择器变量-->
        <li onclick="AddParameter(); Change();" class="mdui-list-item mdui-ripple">
            <div class="mdui-list-item-content">
                <div class="mdui-list-item-title">@p</div>
                <div class="mdui-list-item-text mdui-list-item-one-line">
                    <span class="mdui-text-color-theme-text">选择最近的玩家。</span>
                </div>
            </div>
        </li>
        <li onclick="AddParameter(); Change();" class="mdui-list-item mdui-ripple">
            <div class="mdui-list-item-content">
                <div class="mdui-list-item-title">@r</div>
                <div class="mdui-list-item-text mdui-list-item-one-line">
                    <span class="mdui-text-color-theme-text">选择随机玩家。</span>
                </div>
            </div>
        </li>
        <li onclick="AddParameter(); Change();" class="mdui-list-item mdui-ripple">
            <div class="mdui-list-item-content">
                <div class="mdui-list-item-title">@a</div>
                <div class="mdui-list-item-text mdui-list-item-one-line">
                    <span class="mdui-text-color-theme-text">选择所有玩家，包括已死亡玩家。</span>
                </div>
            </div>
        </li>
        <li onclick="AddParameter(); Change();" class="mdui-list-item mdui-ripple">
            <div class="mdui-list-item-content">
                <div class="mdui-list-item-title">@e</div>
                <div class="mdui-list-item-text mdui-list-item-one-line">
                    <span class="mdui-text-color-theme-text">选择所有实体（包含玩家），不包含死亡的实体。</span>
                </div>
            </div>
        </li>
        <li onclick="AddParameter(); Change();" class="mdui-list-item mdui-ripple">
            <div class="mdui-list-item-content">
                <div class="mdui-list-item-title">@s</div>
                <div class="mdui-list-item-text mdui-list-item-one-line">
                    <span class="mdui-text-color-theme-text">选择该命令的执行者（唯一的），包括已死亡玩家。</span>
                </div>
            </div>
        </li>
        <li onclick="AddParameter(); Change();" class="mdui-list-item mdui-ripple">
            <div class="mdui-list-item-content">
                <div class="mdui-list-item-title">@c</div>
                <div class="mdui-list-item-text mdui-list-item-one-line">
                    <span class="mdui-text-color-theme-text">[仅教育版] 选择自己的吉祥物。‌‌</span>
                </div>
            </div>
        </li>
        <li onclick="AddParameter(); Change();" class="mdui-list-item mdui-ripple">
            <div class="mdui-list-item-content">
                <div class="mdui-list-item-title">@v</div>
                <div class="mdui-list-item-text mdui-list-item-one-line">
                    <span class="mdui-text-color-theme-text">[仅教育版] 选择所有的吉祥物。‌‌</span>
                </div>
            </div>
        </li>`
}

function SelectorParameter() {  // 目标选择器参数
    list.innerHTML = `
        <!--目标选择器参数-->
        <li onclick="AddParameter(); Change();" class="mdui-list-item mdui-ripple">
            <div class="mdui-list-item-content">
                <div class="mdui-list-item-title">x</div>
                <div class="mdui-list-item-text mdui-list-item-one-line">
                    <span class="mdui-text-color-theme-text">指定X轴基准点。</span>
                </div>
            </div>
        </li>
        <li onclick="AddParameter(); Change();" class="mdui-list-item mdui-ripple">
            <div class="mdui-list-item-content">
                <div class="mdui-list-item-title">y</div>
                <div class="mdui-list-item-text mdui-list-item-one-line">
                    <span class="mdui-text-color-theme-text">指定Y轴基准点。</span>
                </div>
            </div>
        </li>
        <li onclick="AddParameter(); Change();" class="mdui-list-item mdui-ripple">
            <div class="mdui-list-item-content">
                <div class="mdui-list-item-title">z</div>
                <div class="mdui-list-item-text mdui-list-item-one-line">
                    <span class="mdui-text-color-theme-text">指定Z轴基准点。</span>
                </div>
            </div>
        </li>
        <li onclick="AddParameter(); Change();" class="mdui-list-item mdui-ripple">
            <div class="mdui-list-item-content">
                <div class="mdui-list-item-title">r</div>
                <div class="mdui-list-item-text mdui-list-item-one-line">
                    <span class="mdui-text-color-theme-text">通过最大距离选择目标。</span>
                </div>
            </div>
        </li>
        <li onclick="AddParameter(); Change();" class="mdui-list-item mdui-ripple">
            <div class="mdui-list-item-content">
                <div class="mdui-list-item-title">rm</div>
                <div class="mdui-list-item-text mdui-list-item-one-line">
                    <span class="mdui-text-color-theme-text">通过最小距离选择目标。</span>
                </div>
            </div>
        </li>
        <li onclick="AddParameter(); Change();" class="mdui-list-item mdui-ripple">
            <div class="mdui-list-item-content">
                <div class="mdui-list-item-title">dx</div>
                <div class="mdui-list-item-text mdui-list-item-one-line">
                    <span class="mdui-text-color-theme-text">指定X轴延时距离。</span>
                </div>
            </div>
        </li>
        <li onclick="AddParameter(); Change();" class="mdui-list-item mdui-ripple">
            <div class="mdui-list-item-content">
                <div class="mdui-list-item-title">dy</div>
                <div class="mdui-list-item-text mdui-list-item-one-line">
                    <span class="mdui-text-color-theme-text">指定Y轴延伸距离。</span>
                </div>
            </div>
        </li>
        <li onclick="AddParameter(); Change();" class="mdui-list-item mdui-ripple">
            <div class="mdui-list-item-content">
                <div class="mdui-list-item-title">dz</div>
                <div class="mdui-list-item-text mdui-list-item-one-line">
                    <span class="mdui-text-color-theme-text">指定Z轴延伸距离。</span>
                </div>
            </div>
        </li>
        <li onclick="AddParameter(); Change();" class="mdui-list-item mdui-ripple">
            <div class="mdui-list-item-content">
                <div class="mdui-list-item-title">scores</div>
                <div class="mdui-list-item-text mdui-list-item-one-line">
                    <span class="mdui-text-color-theme-text">通过计分项选择目标。</span>
                </div>
            </div>
        </li>
        <li onclick="AddParameter(); Change();" class="mdui-list-item mdui-ripple">
            <div class="mdui-list-item-content">
                <div class="mdui-list-item-title">tag</div>
                <div class="mdui-list-item-text mdui-list-item-one-line">
                    <span class="mdui-text-color-theme-text">通过标签选择目标。</span>
                </div>
            </div>
        </li>
        <li onclick="AddParameter(); Change();" class="mdui-list-item mdui-ripple">
            <div class="mdui-list-item-content">
                <div class="mdui-list-item-title">c</div>
                <div class="mdui-list-item-text mdui-list-item-one-line">
                    <span class="mdui-text-color-theme-text">指定数量并排序选择目标。</span>
                </div>
            </div>
        </li>
        <li onclick="AddParameter(); Change();" class="mdui-list-item mdui-ripple">
            <div class="mdui-list-item-content">
                <div class="mdui-list-item-title">l</div>
                <div class="mdui-list-item-text mdui-list-item-one-line">
                    <span class="mdui-text-color-theme-text">通过最大经验等级选择目标。</span>
                </div>
            </div>
        </li>
        <li onclick="AddParameter(); Change();" class="mdui-list-item mdui-ripple">
            <div class="mdui-list-item-content">
                <div class="mdui-list-item-title">lm</div>
                <div class="mdui-list-item-text mdui-list-item-one-line">
                    <span class="mdui-text-color-theme-text">通过最小经验等级选择目标。</span>
                </div>
            </div>
        </li>
        <li onclick="AddParameter(); Change();" class="mdui-list-item mdui-ripple">
            <div class="mdui-list-item-content">
                <div class="mdui-list-item-title">m</div>
                <div class="mdui-list-item-text mdui-list-item-one-line">
                    <span class="mdui-text-color-theme-text">通过游戏模式选择目标。</span>
                </div>
            </div>
        </li>
        <li onclick="AddParameter(); Change();" class="mdui-list-item mdui-ripple">
            <div class="mdui-list-item-content">
                <div class="mdui-list-item-title">name</div>
                <div class="mdui-list-item-text mdui-list-item-one-line">
                    <span class="mdui-text-color-theme-text">通过名称选择目标。</span>
                </div>
            </div>
        </li>
        <li onclick="AddParameter(); Change();" class="mdui-list-item mdui-ripple">
            <div class="mdui-list-item-content">
                <div class="mdui-list-item-title">rx</div>
                <div class="mdui-list-item-text mdui-list-item-one-line">
                    <span class="mdui-text-color-theme-text">通过最大垂直旋转选择目标。</span>
                </div>
            </div>
        </li>
        <li onclick="AddParameter(); Change();" class="mdui-list-item mdui-ripple">
            <div class="mdui-list-item-content">
                <div class="mdui-list-item-title">rxm</div>
                <div class="mdui-list-item-text mdui-list-item-one-line">
                    <span class="mdui-text-color-theme-text">通过最小垂直旋转选择目标。</span>
                </div>
            </div>
        </li>
        <li onclick="AddParameter(); Change();" class="mdui-list-item mdui-ripple">
            <div class="mdui-list-item-content">
                <div class="mdui-list-item-title">ry</div>
                <div class="mdui-list-item-text mdui-list-item-one-line">
                    <span class="mdui-text-color-theme-text">通过最大水平旋转选择目标。</span>
                </div>
            </div>
        </li>
        <li onclick="AddParameter(); Change();" class="mdui-list-item mdui-ripple">
            <div class="mdui-list-item-content">
                <div class="mdui-list-item-title">rym</div>
                <div class="mdui-list-item-text mdui-list-item-one-line">
                    <span class="mdui-text-color-theme-text">通过最小水平旋转选择目标。</span>
                </div>
            </div>
        </li>
        <li onclick="AddParameter(); Change();" class="mdui-list-item mdui-ripple">
            <div class="mdui-list-item-content">
                <div class="mdui-list-item-title">type</div>
                <div class="mdui-list-item-text mdui-list-item-one-line">
                    <span class="mdui-text-color-theme-text">通过实体类型选择目标</span>
                </div>
            </div>
        </li>
        <li onclick="AddParameter(); Change();" class="mdui-list-item mdui-ripple">
            <div class="mdui-list-item-content">
                <div class="mdui-list-item-title">family‌‌</div>
                <div class="mdui-list-item-text mdui-list-item-one-line">
                    <span class="mdui-text-color-theme-text">通过家族选择目标。</span>
                </div>
            </div>
        </li>`
}
