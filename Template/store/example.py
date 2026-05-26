"""课程大作业模板示例代码片段。

该文件用于演示如何在报告中插入代码高亮，
同学们可替换为真实项目脚本或删除引用。
"""

import time


def train_epoch(model, dataloader, optimizer):
    """简单的伪训练循环示例。"""

    model.train()
    total_loss = 0.0

    for batch in dataloader:
        optimizer.zero_grad()
        outputs = model(batch["input"])
        loss = outputs.loss
        loss.backward()
        optimizer.step()
        total_loss += loss.item()

    return total_loss / max(len(dataloader), 1)


if __name__ == "__main__":
    print("请在此处替换为真实训练脚本入口。")
    time.sleep(0.5)
    print("示例运行结束。")
