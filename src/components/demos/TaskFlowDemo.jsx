import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, Plus, Trash2 } from "lucide-react";

const STORAGE_KEY = "martin-portfolio-taskflow-v1";
const MAX_TASKS = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_STORAGE_LENGTH = 20000;

const COLUMNS = [
  { status: "pending", title: "Pendiente", next: "active" },
  { status: "active", title: "En curso", next: "completed" },
  { status: "completed", title: "Completado", next: null },
];

const INITIAL_TASKS = [
  {
    id: "example-api",
    title: "Diseñar los endpoints de la API",
    status: "pending",
  },
  {
    id: "example-ui",
    title: "Construir el panel de proyectos",
    status: "active",
  },
  {
    id: "example-tests",
    title: "Definir los criterios de aceptación",
    status: "completed",
  },
];

function loadTasks() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (!stored || stored.length > MAX_STORAGE_LENGTH) {
      return INITIAL_TASKS;
    }

    const data = JSON.parse(stored);

    if (
      data?.version !== 1 ||
      !Array.isArray(data.tasks) ||
      data.tasks.length > MAX_TASKS
    ) {
      return INITIAL_TASKS;
    }

    const ids = new Set();
    const valid = data.tasks.every((task) => {
      if (
        !task ||
        typeof task.id !== "string" ||
        task.id.length === 0 ||
        task.id.length > 100 ||
        ids.has(task.id) ||
        typeof task.title !== "string" ||
        task.title.trim().length === 0 ||
        task.title.length > MAX_TITLE_LENGTH ||
        !COLUMNS.some((column) => column.status === task.status)
      ) {
        return false;
      }

      ids.add(task.id);
      return true;
    });

    return valid
      ? data.tasks.map(({ id, title, status }) => ({
          id,
          title: title.trim(),
          status,
        }))
      : INITIAL_TASKS;
  } catch {
    return INITIAL_TASKS;
  }
}

function createTaskId() {
  return (
    globalThis.crypto?.randomUUID?.() ??
    `task-${Date.now()}-${Math.random().toString(36).slice(2)}`
  );
}

export default function TaskFlowDemo() {
  const [tasks, setTasks] = useState(loadTasks);
  const [title, setTitle] = useState("");
  const [feedback, setFeedback] = useState("");
  const inputRef = useRef(null);
  const boardRef = useRef(null);
  const focusFrame = useRef(null);
  const inputId = useId();
  const feedbackId = useId();
  const completedCount = tasks.filter(
    (task) => task.status === "completed",
  ).length;
  const limitReached = tasks.length >= MAX_TASKS;

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ version: 1, tasks }),
      );
    } catch {
      // The board remains usable if this browser blocks or fills local storage.
    }
  }, [tasks]);

  useEffect(() => {
    return () => {
      if (focusFrame.current !== null) {
        cancelAnimationFrame(focusFrame.current);
      }
    };
  }, []);

  function focusAfterUpdate(taskId) {
    if (focusFrame.current !== null) {
      cancelAnimationFrame(focusFrame.current);
    }

    focusFrame.current = requestAnimationFrame(() => {
      focusFrame.current = null;
      const cards = Array.from(
        boardRef.current?.querySelectorAll("[data-task-id]") ?? [],
      );
      const card = cards.find((element) => element.dataset.taskId === taskId);
      const nextControl = card?.querySelector("button") ?? inputRef.current;
      nextControl?.focus();
    });
  }

  function addTask(event) {
    event.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle || trimmedTitle.length > MAX_TITLE_LENGTH) {
      setFeedback(
        `Escribe una tarea de entre 1 y ${MAX_TITLE_LENGTH} caracteres.`,
      );
      return;
    }

    if (limitReached) {
      setFeedback(
        `Puedes tener hasta ${MAX_TASKS} tareas. Elimina alguna para añadir otra.`,
      );
      return;
    }

    setTasks((current) => [
      ...current,
      { id: createTaskId(), title: trimmedTitle, status: "pending" },
    ]);
    setTitle("");
    setFeedback(`Tarea añadida: ${trimmedTitle}.`);
  }

  function advanceTask(task, nextStatus) {
    setTasks((current) =>
      current.map((item) =>
        item.id === task.id ? { ...item, status: nextStatus } : item,
      ),
    );
    const nextColumn = COLUMNS.find((column) => column.status === nextStatus);
    setFeedback(`${task.title}: ${nextColumn.title.toLowerCase()}.`);
    focusAfterUpdate(task.id);
  }

  function removeTask(task) {
    const columnTasks = tasks.filter((item) => item.status === task.status);
    const taskIndex = columnTasks.findIndex((item) => item.id === task.id);
    const nextTask = columnTasks[taskIndex + 1] ?? columnTasks[taskIndex - 1];
    setTasks((current) => current.filter((item) => item.id !== task.id));
    setFeedback(`Tarea eliminada: ${task.title}.`);
    focusAfterUpdate(nextTask?.id);
  }

  return (
    <div className="task-demo">
      <div className="task-summary">
        <span>
          {tasks.length} {tasks.length === 1 ? "tarea" : "tareas"} en el tablero
        </span>
        <span>{completedCount} completadas</span>
      </div>

      <form className="task-form" onSubmit={addTask} noValidate>
        <label htmlFor={inputId}>Nueva tarea</label>
        <div className="task-input-row">
          <input
            id={inputId}
            ref={inputRef}
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Por ejemplo: validar el formulario de contacto"
            maxLength={MAX_TITLE_LENGTH}
            aria-describedby={feedbackId}
            autoComplete="off"
          />
          <button type="submit" disabled={limitReached}>
            <Plus size={16} aria-hidden="true" />
            Añadir tarea
          </button>
        </div>
        <p
          className="task-feedback"
          id={feedbackId}
          role="status"
          aria-live="polite"
        >
          {limitReached
            ? `Límite de ${MAX_TASKS} tareas alcanzado. Elimina alguna para continuar.`
            : feedback}
        </p>
      </form>

      <div className="task-board" aria-label="Tablero de tareas" ref={boardRef}>
        {COLUMNS.map((column) => {
          const columnTasks = tasks.filter(
            (task) => task.status === column.status,
          );
          const nextColumn = COLUMNS.find(
            (item) => item.status === column.next,
          );

          return (
            <section
              className={`task-column task-column-${column.status}`}
              key={column.status}
            >
              <h2 className="task-column-title">
                {column.title}
                <span aria-label={`${columnTasks.length} tareas`}>
                  {columnTasks.length}
                </span>
              </h2>

              {columnTasks.length === 0 ? (
                <p className="task-empty">No hay tareas en esta columna.</p>
              ) : (
                <ul className="task-list">
                  {columnTasks.map((task) => (
                    <li
                      className="task-card"
                      key={task.id}
                      data-task-id={task.id}
                    >
                      <p>{task.title}</p>
                      <div className="task-card-actions">
                        {nextColumn && (
                          <button
                            type="button"
                            onClick={() => advanceTask(task, column.next)}
                            aria-label={`Mover ${task.title} a ${nextColumn.title.toLowerCase()}`}
                          >
                            Avanzar
                            <ArrowRight size={14} aria-hidden="true" />
                          </button>
                        )}
                        <button
                          className="task-delete"
                          type="button"
                          onClick={() => removeTask(task)}
                          aria-label={`Eliminar ${task.title}`}
                        >
                          <Trash2 size={14} aria-hidden="true" />
                          <span>Eliminar</span>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>

      <p className="task-note">
        Demo con datos de ejemplo. Las tareas se guardan solo en este navegador
        cuando el almacenamiento local está disponible; no hay cuentas, servidor
        ni sincronización entre dispositivos.
      </p>
    </div>
  );
}
