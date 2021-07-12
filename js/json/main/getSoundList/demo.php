// 获取当前文件的上级目录
$con = dirname(__FILE__);
// 扫描$con目录下的所有文件
$filename = scandir($con);
// 定义一个数组接收文件名
$conname = array();
foreach($filename as $k=>$v){
    // 跳过两个特殊目录   continue跳出循环
    if($v=="." || $v==".."){continue;}
    //截取文件名，我只需要文件名不需要后缀;然后存入数组。如果你是需要后缀直接$v即可
    $conname[] = $v;
}

echo $conname